import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateOtp, sendOtpMail, AppError } from "../utils";
import { generateOtp, getOtpExpiry, expiresIn } from "../config/auth";

export const signup = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOtp();
  const otpExpiresAt = getOtpExpiry();

  try {
    await prisma.user.create({
      data: { email, password: hashedPassword, otp, otpExpiresAt },
    });

    await sendOtpMail(email, otp);
    return { message: "OTP sent to email" };
  } catch (error) {
    // Rollback user creation if email sending fails
    await prisma.user.delete({ where: { email } });
    throw new AppError("Signup failed. Please try again later.", 500);
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  validateOtp(user, otp);

  await prisma.user.update({
    where: { email },
    data: { verified: true, otp: null, otpExpiresAt: null },
  });

  return { message: "OTP verified, account activated" };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Invalid credentials", 401);
  }

  const otp = generateOtp();
  const otpExpiresAt = getOtpExpiry();

  await prisma.user.update({
    where: { email },
    data: { otp, otpExpiresAt },
  });

  await sendOtpMail(email, otp);
  return { message: "OTP sent to email" };
};

export const confirmLoginOtp = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  validateOtp(user, otp);

  const token = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET!, {
    expiresIn: expiresIn,
  });

  await prisma.user.update({
    where: { email },
    data: { otp: null, otpExpiresAt: null },
  });

  return { message: "Login successful", token };
};

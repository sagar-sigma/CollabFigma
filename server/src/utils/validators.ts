import type { User } from "../generated/prisma";
import { AppError } from "./AppError";

export const validateOtp = (user: User | null, otp: string): void => {
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user.otp !== otp) {
    throw new AppError("Invalid OTP", 400);
  }
  if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
    throw new AppError("OTP expired", 419);
  }
};

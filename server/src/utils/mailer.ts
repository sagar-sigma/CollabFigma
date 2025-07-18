import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpMail = async (to: string, otp: string) => {
  // const info = await transporter.sendMail({
  //   from: `"Collab-Figma" <${process.env.EMAIL_USER}>`,
  //   to,
  //   subject: "Your OTP for Collab-Figma",
  //   text: `Your OTP is ${otp}`,
  //   html: `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`,
  // });
  // return info;
  return otp;
};

export const expiresIn = "1d"; // You can update this to '12h', '7d', etc.

export const OTP_CONFIG = {
  expiryMinutes: 10,
  length: 6,
};

export const generateOtp = (): string =>
  Math.floor(
    Math.pow(10, OTP_CONFIG.length - 1) +
      Math.random() * 9 * Math.pow(10, OTP_CONFIG.length - 1)
  ).toString();

export const getOtpExpiry = (): Date =>
  new Date(Date.now() + OTP_CONFIG.expiryMinutes * 60 * 1000);

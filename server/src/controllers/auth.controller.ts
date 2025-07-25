import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { AppError, sendError, sendSuccess } from "../utils";

export const signup = async (req: Request, res: Response) => {
  try {
    const data = await authService.signup(req.body.email, req.body.password);
    return sendSuccess(res, data.message, null, 201);
  } catch (err) {
    const error =
      err instanceof AppError
        ? err
        : new AppError("Internal server error", 500);
    return sendError(res, error.message, error.statusCode);
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const data = await authService.verifyOtp(req.body.email, req.body.otp);
    return sendSuccess(res, data.message);
  } catch (err) {
    const error =
      err instanceof AppError
        ? err
        : new AppError("Internal server error", 500);
    return sendError(res, error.message, error.statusCode);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await authService.login(req.body.email, req.body.password);
    return sendSuccess(res, data.message);
  } catch (err) {
    const error =
      err instanceof AppError
        ? err
        : new AppError("Internal server error", 500);
    return sendError(res, error.message, error.statusCode);
  }
};

export const confirmLoginOtp = async (req: Request, res: Response) => {
  try {
    const { message, data } = await authService.confirmLoginOtp(
      req.body.email,
      req.body.otp
    );
    // Set cookie
    res.cookie("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return sendSuccess(res, message, data);
  } catch (err) {
    const error =
      err instanceof AppError
        ? err
        : new AppError("Internal server error", 500);
    return sendError(res, error.message, error.statusCode);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return sendSuccess(res, "Logged out successfully");
  } catch (err) {
    const error =
      err instanceof AppError
        ? err
        : new AppError("Internal server error", 500);
    return sendError(res, error.message, error.statusCode);
  }
};

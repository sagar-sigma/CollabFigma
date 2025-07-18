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
    const data = await authService.confirmLoginOtp(
      req.body.email,
      req.body.otp
    );
    return sendSuccess(res, data.message, { token: data.token });
  } catch (err) {
    const error =
      err instanceof AppError
        ? err
        : new AppError("Internal server error", 500);
    return sendError(res, error.message, error.statusCode);
  }
};

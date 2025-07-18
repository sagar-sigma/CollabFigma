import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { AppError, sendError, sendSuccess } from "../utils";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById((req as any).userId);
    return sendSuccess(res, "User fetched successfully", user, 200);
  } catch (err) {
    const error =
      err instanceof AppError
        ? err
        : new AppError("Internal server error", 500);
    return sendError(res, error.message, error.statusCode);
  }
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { sendError } from "../utils/response";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("No token provided", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    // Attach userId to request object
    (req as any).userId = decoded.userId;

    next();
  } catch (error) {
    const err =
      error instanceof AppError
        ? error
        : new AppError("Invalid or expired token", 403);

    return sendError(res, err.message, err.statusCode);
  }
};

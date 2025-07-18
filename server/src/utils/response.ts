import { Response } from "express";
import { ApiResponse } from "../types";

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200
): Response<ApiResponse<T>> => {
  const response = {
    success: true,
    message,
    statusCode,
    ...(data !== undefined ? { data } : {}),
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 400
): Response<ApiResponse> => {
  const response = {
    success: false,
    message,
    statusCode,
  };
  return res.status(statusCode).json(response);
};

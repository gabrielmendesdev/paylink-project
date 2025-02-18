import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/apiExceptions"; 

export const handleErrorMiddleware = (
  err: Error & Partial<HttpException>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    message,
  });
};
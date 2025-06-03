import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/supabase-error';

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Log error details
  console.error(`[ERROR] ${message}`, {
    path: req.path,
    method: req.method,
    statusCode,
    code: err.code,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    details: err.details,
  });

  // Send response to client
  res.status(statusCode).json({
    success: false,
    message,
    code: err.code,
    // Only include stack trace and details in development
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err.details,
    }),
  });
}; 
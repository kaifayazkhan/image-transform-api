import type { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.js';
import { AppError, UnauthorizedError } from '../utils/appError.js';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../utils/constants.js';
import { cookieOptions } from '../utils/cookie.js';

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    code: err.code,
    message: err.message,
    status: err.statusCode || 500,
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
    errors: err?.errors,
    stack: err?.stack,
  });

  if (err instanceof UnauthorizedError && err.shouldClearCookies) {
    res.clearCookie(ACCESS_TOKEN_KEY, cookieOptions);
    res.clearCookie(REFRESH_TOKEN_KEY, cookieOptions);
  }

  res.status(err.statusCode || 500).json({
    status: err.statusCode,
    code: err.code,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
    stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined,
  });
};

export default errorHandler;

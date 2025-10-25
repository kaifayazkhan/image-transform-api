import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import AppError from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

interface JwtPayload {
  id: number;
}

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(400, 'Missing access token');
    }

    try {
      const { id } = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as JwtPayload;

      if (!id) {
        return next(new AppError(401, 'Unauthorized request'));
      }

      req.user = { id };
      next();
    } catch (err) {
      throw new AppError(401, 'Unauthorized request');
    }
  }
);

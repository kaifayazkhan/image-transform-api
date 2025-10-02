import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import { env } from '../config/env.js';
import AppError from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

interface JwtPayload {
  id: number;
}

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new AppError(401, 'Unauthorized request');
    }

    try {
      const { id } = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as JwtPayload;

      const user = await UserModel.findById(id);

      if (!user) {
        return next(new AppError(401, 'Unauthorized request'));
      }

      req.user = user;
      next();
    } catch (err) {
      throw new AppError(401, 'Unauthorized request');
    }
  }
);

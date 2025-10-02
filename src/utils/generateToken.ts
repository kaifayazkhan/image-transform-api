import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import AppError from './appError.js';

export const generateAccessToken = (id: number) => {
  try {
    return jwt.sign({ id }, env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });
  } catch (err) {
    throw new AppError(500, 'Failed to generate access token');
  }
};

export const generateRefreshToken = (id: number) => {
  try {
    return jwt.sign(
      {
        id,
      },
      env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '15d',
      }
    );
  } catch (err) {
    throw new AppError(500, 'Failed to generate refresh token');
  }
};

export const generateAccessAndRefreshToken = (id: number) => {
  return {
    accessToken: generateAccessToken(id),
    refreshToken: generateRefreshToken(id),
  };
};

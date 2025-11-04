import type { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';

import { HTTP_STATUS } from '../utils/httpStatus.js';
import { UnauthorizedError } from '../utils/appError.js';
import UserService from '../services/user.service.js';
import ApiResponse from '../utils/apiResponse.js';

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.id) throw new UnauthorizedError('Unauthorized request');

    const result = await UserService.getUserById(req.user.id);

    return new ApiResponse(
      HTTP_STATUS.OK,
      result,
      'User retrieved successfully'
    ).send(res);
  }
);

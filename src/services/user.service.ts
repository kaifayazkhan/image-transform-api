import UserModel from '../models/user.model.js';
import { AppError } from '../utils/appError.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';
import { ERROR_CODES } from '../utils/errorCodes.js';
import logger from '../config/logger.js';

class UserService {
  async getUserById(userId: number) {
    const result = await UserModel.findById(userId);

    if (!result) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        'No user found',
        ERROR_CODES.NOT_FOUND
      );
    }

    logger.info(`User retrieved successfully for id: ${userId}`);
    return {
      id: result.id,
      name: result.name,
      email: result.email,
    };
  }
}

export default new UserService();

import type { ZodError } from 'zod';

class AppError extends Error {
  statusCode: number;
  data: null | object;
  success: boolean;
  errors: Array<{ message: string; field?: string }>;

  constructor(
    statusCode: number,
    message = 'Something went wrong',
    errors: ZodError[] | any[] = [],
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;

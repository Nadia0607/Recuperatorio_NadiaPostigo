import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestException } from '../utils/http.exception';
import logger from '../utils/logger';

//es el que maneja los errores de los validadores(check)

export const handleValidationErrors = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map(err => err.msg).join(', ');
    logger.error(`Validation Error: ${errorMessage}`);
    throw new BadRequestException(errorMessage);
  }
  next();
};

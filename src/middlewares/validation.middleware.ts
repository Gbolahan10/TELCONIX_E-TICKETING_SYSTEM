import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '../exceptions/HttpException';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => {
            if (error.children && error.children.length > 0) {
              return error.children[0].children
                .map((childError: ValidationError) => {
                  if (childError.constraints) {
                    return Object.values(childError.constraints).join(', ');
                  } else {
                    return '';
                  }
                })
                .join(', ');
            } else if (error.constraints) {
              return Object.values(error.constraints).join(', ');
            } else {
              return '';
            }
          })
          .join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
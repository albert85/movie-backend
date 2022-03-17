import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { Response, Request, NextFunction } from 'express';

export const handleResponse = (res: Response, statusCode: number, status: boolean, message: string, data?: any, token?: string) => res.status(statusCode).json({
  message,
  status,
  data,
  token,
});

export const generateToken = (payload: any) => jwt.sign(payload, process.env.TOKEN_PASSWORD || '');

export const decodeToken = (token: string) => jwt.verify(token, process.env.TOKEN_PASSWORD || '');

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};


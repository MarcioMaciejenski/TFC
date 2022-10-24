import { NextFunction, Request, Response } from 'express';
import ErroGenerate from '../utils/ErrorGenerate';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ErroGenerate('All fields must be filled', 400));
  }
  next();
};

import { NextFunction, Request, Response } from 'express';
import ErroGenerate from '../utils/ErrorGenerate';
import Token from '../utils/Token';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return next(new ErroGenerate('Incorrect token', 401));
  }

  try {
    Token.decode(token);
  } catch (error) {
    return next(new ErroGenerate('Token must be a valid token', 401));
  }
  return next();
};

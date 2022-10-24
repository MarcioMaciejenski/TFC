import { NextFunction, Request, Response } from 'express';
import ErroGenerate from '../utils/ErrorGenerate';

export default (err: ErroGenerate & Error, req: Request, res: Response, _next: NextFunction) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json(err.message);
};

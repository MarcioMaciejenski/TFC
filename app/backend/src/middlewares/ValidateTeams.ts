import { NextFunction, Request, Response } from 'express';
import ErroGenerate from '../utils/ErrorGenerate';

export default (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return next(new ErroGenerate('It is not possible to create a match with two equal teams', 422));
  }
  return next();
};

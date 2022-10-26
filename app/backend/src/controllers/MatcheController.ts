import { NextFunction, Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

export default class Matche {
  private _service: MatcheService;

  constructor(service: MatcheService) {
    this._service = service;
    this.getAll = this.getAll.bind(this);
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allMatches = await this._service.getAll();
      return res.status(200).json(allMatches);
    } catch (error) {
      next(error);
    }
  };
}

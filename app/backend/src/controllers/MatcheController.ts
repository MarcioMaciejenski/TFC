import { NextFunction, Request, Response } from 'express';
import { ICreateMatche } from '../interfaces/IMatche.interface';
import MatcheService from '../services/MatcheService';

export default class Matche {
  private _service: MatcheService;

  constructor(service: MatcheService) {
    this._service = service;
    this.getAll = this.getAll.bind(this);
    this.getInProgress = this.getInProgress.bind(this);
  }

  private getInProgress = async (inProgress: string | any
  | string[] | any[] | undefined) => {
    // console.log('controller', inProgress);
    try {
      const getMatchesInProgress = await this._service.getInProgress(inProgress);
      return getMatchesInProgress;
    } catch (error) {
      throw new Error('error');
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      try {
        const allMatches = await this._service.getAll();
        return res.status(200).json(allMatches);
      } catch (error) {
        next(error);
      }
    }
    const findInProgress = await this.getInProgress(inProgress);
    return res.status(200).json(findInProgress);
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matche = req.body as ICreateMatche;
      const newMatche = await this._service.create(matche);
      return res.status(201).json(newMatche);
    } catch (error) {
      next(error);
    }
  };
}

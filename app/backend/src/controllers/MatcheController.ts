import { NextFunction, Request, Response } from 'express';
import ErroGenerate from '../utils/ErrorGenerate';
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
      if (newMatche === null) throw new ErroGenerate('There is no team with such id!', 404);
      return res.status(201).json(newMatche);
    } catch (error) {
      next(error);
    }
  };

  public finishMatche = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const endMatch = await this._service.finishMatche(id);
      if (endMatch === null) {
        throw new ErroGenerate('Id matche not exists', 404);
      }
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  public updateMatcheScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this._service.updateMatcheScore(id, homeTeamGoals, awayTeamGoals);
      return res.status(200).json({ message: 'Updated score' });
    } catch (error) {
      next(error);
    }
  };
}

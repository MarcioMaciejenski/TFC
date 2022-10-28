import { NextFunction, Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoard {
  private _service: LeaderBoardService;

  constructor(service: LeaderBoardService) {
    this._service = service;
    this.getAllHomeTeams = this.getAllHomeTeams.bind(this);
  }

  public getAllHomeTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeTeamsRanking = await this._service.getAllHomeTeams();
      return res.status(200).json(homeTeamsRanking);
    } catch (error) {
      next(error);
    }
  };
}

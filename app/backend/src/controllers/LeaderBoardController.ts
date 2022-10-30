import { NextFunction, Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoard {
  private _service: LeaderBoardService;

  constructor(service: LeaderBoardService) {
    this._service = service;
    this.getHomeRanking = this.getHomeRanking.bind(this);
    this.getAwayRanking = this.getAwayRanking.bind(this);
    this.getGeneralRanking = this.getGeneralRanking.bind(this);
  }

  public getHomeRanking = async (req: Request, res: Response, next:
  NextFunction): Promise<Response | undefined> => {
    try {
      const homeTeamsRanking = await this._service.getHomeRanking();
      return res.status(200).json(homeTeamsRanking);
    } catch (error) {
      next(error);
    }
  };

  public getAwayRanking = async (req: Request, res: Response, next:
  NextFunction): Promise<Response | undefined> => {
    try {
      const awayTeamsRanking = await this._service.getAwayRanking();
      return res.status(200).json(awayTeamsRanking);
    } catch (error) {
      next(error);
    }
  };

  public getGeneralRanking = async (req: Request, res: Response, next:
  NextFunction): Promise<Response | undefined> => {
    try {
      const generalRanking = await this._service.getGeneralRanking();
      return res.status(200).json(generalRanking);
    } catch (error) {
      next(error);
    }
  };
}

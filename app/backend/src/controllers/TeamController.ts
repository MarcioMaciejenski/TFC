import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class Team {
  private _service: TeamService;

  constructor(service: TeamService) {
    this._service = service;
    this.getAll = this.getAll.bind(this);
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allTeams = await this._service.getAll();
      return res.status(200).json(allTeams);
    } catch (error) {
      next(error);
    }
  };
}

import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

export default class User {
  private _service: UserService;

  constructor(service: UserService) {
    this._service = service;
    this.login = this.login.bind(this);
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this._service.login({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}

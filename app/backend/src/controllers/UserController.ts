import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

export default class User {
  private _service: UserService;

  constructor(service: UserService) {
    this._service = service;
    this.login = this.login.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  public login = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | undefined> => {
    try {
      const { email, password } = req.body;
      const token = await this._service.login({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public verifyLogin = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | undefined> => {
    try {
      const token = req.headers.authorization;
      const getRole = await UserService.verifyToken(token);
      return res.status(200).json({ role: getRole });
    } catch (error) {
      next(error);
    }
  };
}

import bcrypt = require('bcryptjs');
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';
import { IUser } from '../interfaces/IUser.interface';
import Token from '../utils/Token';
import ErroGenerate from '../utils/ErrorGenerate';
import IRole from '../interfaces/IRole.interface';

export default class User {
  constructor(private model = UserModel) { }

  private static generateToken(user: UserModel) {
    const userToken = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
    return Token.encode(userToken);
  }

  public async login(user: IUser): Promise<string> {
    const isUser = await this.model.findOne({ where: { email: user.email } });
    if (!isUser) {
      throw (new ErroGenerate('Incorrect email or password', 401));
    }
    const passwordDB = isUser.password;
    const verifyPassword = await bcrypt.compare(user.password, passwordDB);
    if (verifyPassword) {
      return User.generateToken(isUser);
    }
    throw new ErroGenerate('Incorrect email or password', 401);
  }

  public static async verifyToken(token: string | undefined):
  Promise<string | jwt.JwtPayload | null> {
    if (!token) throw (new ErroGenerate('Incorrect token', 401));
    const data = Token.decode(token) as IRole;
    return data.data.role;
  }
}

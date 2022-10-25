import bcrypt = require('bcryptjs');
import UserModel from '../database/models/UserModel';
import { IUser } from '../interfaces/IUser.interface';
import Token from '../utils/Token';
import ErroGenerate from '../utils/ErrorGenerate';

export default class User {
  constructor(private model = UserModel) { }

  private static generateToken(user: UserModel) {
    const userToken = {
      id: user.getDataValue('id'),
      username: user.getDataValue('username'),
      role: user.getDataValue('role'),
      email: user.getDataValue('email'),
    };
    return Token.encode(userToken);
  }

  public async login(user: IUser): Promise<string> {
    const isUser = await this.model.findOne({ where: { email: user.email } });
    if (!isUser) {
      throw (new ErroGenerate('Incorrect email or password', 401));
    }
    const passwordDB = isUser?.getDataValue('password');
    const verifyPassword = await bcrypt.compare(user.password, passwordDB);
    if (verifyPassword) {
      return User.generateToken(isUser);
    }
    throw new ErroGenerate('Incorrect email or password', 401);
  }
}

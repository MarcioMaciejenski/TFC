import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import IUserToken from '../interfaces/IUser.interface';

const secret = process.env.JWT_SECRET || ('secret' as jwt.Secret);

class Token {
  private static options: jwt.SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  public static encode(data: IUserToken) {
    return jwt.sign({ data }, secret, Token.options);
  }

  public static decode(token: string) {
    return jwt.verify(token, secret);
  }
}

export default Token;

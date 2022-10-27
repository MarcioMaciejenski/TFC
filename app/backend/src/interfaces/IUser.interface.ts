export interface IUser {
  id?: number;
  email: string;
  password: string;
}

export default interface IUserToken {
  id: number;
  role: string;
  username: string;
  email: string;
}

import * as Express from 'express';

export interface UserCreds {
  id?: number,
  username: string,
  password?: string,
}

export interface ValidatedCredsRequest extends Express.Request {
  userCreds: UserCreds,
}

import * as Express from 'express';

export interface UserCreds {
  id?: Readonly<number>,
  username: Readonly<string>,
  password?: Readonly<string>,
}

export interface ValidatedCredsRequest extends Express.Request {
  userCreds: Readonly<UserCreds>,
}

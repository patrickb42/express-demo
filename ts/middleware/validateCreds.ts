import * as Express from 'express';

import { ValidatedCredsRequest } from '../types';

export const validateCreds = (
  req: ValidatedCredsRequest,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  const { username, password } = req.body;
  req.userCreds = { username, password };
  return (username === undefined || password === undefined)
    ? res.status(400).json({ message: 'must provide username and password' })
    : next();
};

export default {};

import * as Express from 'express';

import { UserCreds } from '../data/models';
import { validateCreds } from '../middleware';

import { ValidatedCredsRequest } from '../types';

export const router = Express.Router();

router.use(validateCreds);

const register = async (req: ValidatedCredsRequest, res: Express.Response) => {
  const { username } = req.userCreds;
  try {
    const result1 = await UserCreds.get({ username });
    if (result1.length !== 0) {
      return res.status(400).json({ message: `username ${username} already exists` });
    }
    const result2 = await UserCreds.insert({ item: req.userCreds });
    return res.status(201).json(result2);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'error registering user',
    });
  }
};

const login = () => {
  //
};

router.post('/register', register);
router.post('/login', login);

export default {};

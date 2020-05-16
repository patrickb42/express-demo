import * as Express from 'express';
import * as Bcrypt from 'bcryptjs';

import { UserCreds } from '../data/models';
import { validateCreds } from '../middleware';
import { generateToken } from '../utils';

import { ValidatedCredsRequest } from '../types';

export const router = Express.Router();

const register = async (req: ValidatedCredsRequest, res: Express.Response) => {
  const { username, password } = req.userCreds;

  try {
    const hashedPassword = Bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS, 10));
    const result1 = await UserCreds.get({ username });
    if (result1.length !== 0) {
      return res.status(400).json({ message: `username ${username} already exists` });
    }

    const [result2] = await UserCreds.insert({
      item: {
        ...req.userCreds,
        password: hashedPassword,
      },
    });

    const token = generateToken({ id: result2.id, username: result2.username });
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'error registering user',
    });
  }
};

const login = async (req: ValidatedCredsRequest, res: Express.Response) => {
  const { username, password } = req.userCreds;

  try {
    const [result] = await UserCreds.get({ username });
    return (result !== undefined && Bcrypt.compareSync(password, result.password))
      ? res.status(200).json({ token: generateToken({ id: result.id, username: result.username }) })
      : res.status(403).json({ message: 'invalid credentials' });
  } catch (error) {
    return res.status(500).json({
      error: 'error logging in',
      mesage: error.message,
    });
  }
};

router.post('/register', validateCreds, register);
router.post('/login', validateCreds, login);

export default {};

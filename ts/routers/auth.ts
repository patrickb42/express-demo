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

    return res.status(201).json(generateToken({ id: result2.id, username: result2.username }));
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

router.post('/register', validateCreds, register);
router.post('/login', validateCreds, login);

export default {};

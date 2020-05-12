import * as Express from 'express';
import * as Bcrypt from 'bcryptjs';

import { UserCreds } from '../data/models';
import { validateCreds } from '../middleware';
import { filterObject } from '../utils';

import {
  UserCreds as TUserCreds,
  ValidatedCredsRequest,
} from '../types';

export const router = Express.Router();

router.use(validateCreds);

const register = async (req: ValidatedCredsRequest, res: Express.Response) => {
  const { username, password } = req.userCreds;

  const hashedPassword = Bcrypt.hashSync(password, process.env.SALT_ROUNDS);
  try {
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
    return res.status(201).json(filterObject<TUserCreds>({
      sourceObject: result2,
      filter: { id: null, username: null },
    })); // make this return a token 
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

import * as Jwt from 'jsonwebtoken';

interface GenerateTokenArg {
  id: number,
  username: string,
}

export const generateToken = ({ id, username }: GenerateTokenArg) => {
  const payload = {
    subject: id,
    username,
  };
  const options: Jwt.SignOptions = {
    expiresIn: process.env.TOKEN_LIFETIME,
  };

  return Jwt.sign(payload, process.env.JWT_SECRET, options);
};

export default {};

import jwt from 'jsonwebtoken';

export const createToken = (data) => {
  const token = jwt.sign(data, 'secret', { expiresIn: '1h' });

  return token;
};

export const verifyToken = (token) => {
  const verify = jwt.verify(token, 'secret');
  return verify;
};

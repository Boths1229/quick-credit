import jwt from 'jsonwebtoken';

export const createToken = (data) => {
  const token = jwt.sign(data, 'secret', { expiresIn: '1h' });

  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.params.token || req.headers['x-access-token'] || req.body.token;
  if (!token) {
    return res.status(403).json({
      message: 'No token found'
    });
  }
  return jwt.verify(token, 'secret', (error, user) => {
    if (error) {
      return res.status(401).json({
        message: 'token is invalid'
      });
    }
    req.user = user;
    next();
  });
};

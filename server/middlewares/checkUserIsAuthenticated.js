import jwt from 'jsonwebtoken';

const checkUserIsAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization || req.query.authorization;
    if (!token) {
      return res.status(401).json({
        message: 'no token found',
      });
    }
    const { SECRET } = process.env;
    const decoded = jwt.verify(token, SECRET).data;
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'invalid token',
    });
  }
};

export default checkUserIsAuthenticated;

import Users from '../models/users';
import Model from '../models/db';

const model = new Model('users');

const validateEmailExistence = (req, res, next) => {
  const { email } = req.body;
  const user = model.select('email', `email=${email}`);
  console.log(`email ${email}`);
  console.log(`user ${user}`);
  if (user.length > 0) {
    return res.status(409).json({
      message: 'this email is already in use'
    });
  }
  next();
};

export default validateEmailExistence;

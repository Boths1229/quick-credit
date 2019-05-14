import Users from '../models/users';

const validateUserExistence = (req, res, next) => {
  const { email } = req.body;
  const valid = Users.filter(user => user.email === email);

  if (valid.length < 0) {
    return res.status(404).json({
      message: 'invalid email or password'
    });
  }
  next();
};

export default validateUserExistence;

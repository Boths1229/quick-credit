import Model from '../models/db';

const model = new Model('users');

const validateEmailExistence = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await model.select('*', 'email=$1', [email]);
    if (user) {
      return res.status(409).json({
        message: 'this email is already in use'
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      message: 'server error'
    });
  }
};


export default validateEmailExistence;

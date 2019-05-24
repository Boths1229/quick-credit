import Model from '../models/db';

const model = new Model('users');

const validateVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await model.select('*', 'email=$1', [email]);

    if (!user) {
      return res.status(404).json({
        message: 'email not found'
      });
    }
    if (user.status === 'verified') {
      return res.status(409).json({
        message: 'User already verified'
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      message: 'server error'
    });
  }
};


export default validateVerifyEmail;

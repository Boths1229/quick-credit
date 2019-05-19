import Model from '../models/db';

const model = new Model('users');

const validateEmailExistence = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await model.select('*', 'email=$1', [email]);
   console.log(email)
    if (user) {
      return res.status(409).json({
        message: 'this email is already in use'
      });
    }
  } catch (err) {
    console.log(err.message);
  }
  console.log('error');
  next();
}


export default validateEmailExistence;

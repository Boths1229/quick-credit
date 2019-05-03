import Users from '../dummy/user';

const validateEmailExistence = (req, res, next) => {
   const user = Users.filter((user) => user.email === req.body.email);
   if (user.length > 0) {
       return res.status(409).json({
        message: 'this email is already in use'
       })
   }
   next();
}

export default validateEmailExistence;

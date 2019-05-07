import Users from '../dummy/auth';

const validateUserExistence = (req, res, next) => {
    const { email } = req.body;
    const valid = Users.filter((user) => user.email === email)
     
    if(valid.length < 0) {
        return res.status(409).json({
            message: 'invalid details'
        })
    }
    next()
}

export default validateUserExistence;
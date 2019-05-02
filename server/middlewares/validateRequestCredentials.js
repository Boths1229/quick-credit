import Validator from 'validatorjs';

const errorMessages = {
    required: 'the :attribute is required',
    email: 'the email format is invalid',
    min: 'Min :attribute limit is :min',
};

const validateRequestCredentials = (req, res, next, rules) => {
    const validator = new Validator(req.body,rules, errorMessages)
    if (validator.passes()) {
        return next();
    }
    const errors = validator.errors.all();
    return res.status(400).json({
        message: 'Invalid Credentials',
        errors
    })
}

export const validateRegisterationCredentials = (req, res, next) => {
    req.body.age = +req.body.age
    const rules = {
        name: 'required|alpha',
        age: 'min:18',
        email: 'required|email',
        password: 'required|min:6'
    }
    return validateRequestCredentials(req, res, next, rules);
}

import Validator from 'validatorjs';

const errorMessages = {
  required: 'the :attribute is required',
  email: 'the email format is invalid',
  min: 'Min :attribute limit is :min',
};

const validateRequestCredentials = (req, res, next, rules) => {
  const validator = new Validator(req.body, rules, errorMessages);
  if (validator.passes()) {
    return next();
  }
  const errors = validator.errors.all();
  return res.status(400).json({
    message: 'Invalid Credentials',
    errors
  });
};

export const validateRegisterationCredentials = (req, res, next) => {
  req.body.age = +req.body.age;
  const rules = {
    name: 'required|alpha',
    age: 'min:18',
    email: 'required|email',
    password: 'required|min:6'
  };
  return validateRequestCredentials(req, res, next, rules);
};

export const validateSigninCredentials = (req, res, next) => {
  const rules = {
    email: 'required|email',
    password: 'required|min:6'
  };
  return validateRequestCredentials(req, res, next, rules);
};

export const validateApplyLoanCredentials = (req, res, next) => {
  const rules = {
    name: 'required',
    home_address: 'string',
    current_loan: 'required',
    name_organisation: 'required',
    address_organisation: 'required',
    bank_details: {
      account_number: 'required|min:10'
    }
  };
  return validateRequestCredentials(req, res, next, rules);
};

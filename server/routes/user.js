import User from '../controller/User';
import Loan from '../controller/Loan';
import {
    validateRegisterationCredentials, validateSigninCredentials, validateApplyLoanCredentials
} from '../middlewares/validateRequestCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence';
import validateUserExistence from '../middlewares/validateUserExistence';

export default (app) => {
    app.post('/api/v1/auth/signup', validateRegisterationCredentials, validateEmailExistence, User.signUp);
    app.post('/api/v1/auth/signin', validateSigninCredentials, validateUserExistence, User.signIn);
    app.post('/api/v1/loan/applyloan', validateApplyLoanCredentials, Loan.applyLoan);
}
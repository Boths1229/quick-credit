import User from '../controller/User';
import {
    validateRegisterationCredentials, validateSigninCredentials
} from '../middlewares/validateRequestCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence';
import validateUserExistence from '../middlewares/validateUserExistence';

export default (app) => {
    app.post('/api/v1/user/signup', validateRegisterationCredentials, validateEmailExistence, User.signUp);
    app.post('/api/v1/user/signin', validateSigninCredentials,validateUserExistence, User.signIn)
}
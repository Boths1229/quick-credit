import User from '../controller/User';
import {
    validateRegisterationCredentials
} from '../middlewares/validateRequestCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence';

export default (app) => {
    app.post('/api/v1/user/signup', validateRegisterationCredentials, validateEmailExistence, User.signUp)
}
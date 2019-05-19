import User from '../controller/User';
import Loan from '../controller/Loan';
import {
  validateRegisterationCredentials, validateSigninCredentials, validateApplyLoanCredentials
} from '../middlewares/validateRequestCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence';
import validateVerifyEmail from '../middlewares/validateVerifyEmail';
import { verifyToken } from '../helper/token';
import isAdmin from '../middlewares/isAdmin';

export default (app) => {
  // Users
  app.post('/api/v1/auth/signup', validateRegisterationCredentials, validateEmailExistence, User.signUp);
  app.post('/api/v1/auth/signin', validateSigninCredentials, User.signIn);
  app.patch('/api/v1/users/:email/verify', validateVerifyEmail, User.verifyUser);
  app.get('/api/v1/users', User.getAllUsers);

  // Loans
  app.post('/api/v1/loans', validateApplyLoanCredentials, Loan.applyLoan);
  app.get('/api/v1/loans', Loan.getAllLoans);
  app.get('/api/v1/repaidLoans', Loan.getRepaidLoans);
  app.get('/api/v1/currentLoans', Loan.getCurrentLoans);
  app.get('/api/v1/loans/:id', Loan.getSpecificLoan);
  app.patch('/api/v1/loans/:loanid', Loan.approveReject);
  app.post('/api/v1/loans/:loanid/repayments', Loan.postLOanRepayments);
  app.get('/api/v1/loans/:loanid/repayments', Loan.getRepaymentRecord);
};

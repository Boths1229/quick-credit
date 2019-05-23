import User from '../controller/User';
import Loan from '../controller/Loan';
import LoanRepayment from '../controller/loanRepayment';
import {
  validateRegisterationCredentials, validateSigninCredentials, validateApplyLoanCredentials
} from '../middlewares/validateRequestCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence';
import validateVerifyEmail from '../middlewares/validateVerifyEmail';
import verifyLoanEmailExistence from '../middlewares/verifyLoanEmailExistence';
import postPayment from '../middlewares/postPayment';
import { verifyToken } from '../helper/token';
import { isAdmin } from '../middlewares/isAdmin';

const {
  signIn, signUp, verifyUser, getAllUsers
} = User;
const {
  applyLoan, getAllLoans, getRepaidAndCurrentLoans, getSpecificLoan, approveReject
} = Loan;
const { postLoanRepayments, getRepaymentRecord } = LoanRepayment;

export default (app) => {
  // Users
  app.post('/api/v1/auth/signup', validateRegisterationCredentials, validateEmailExistence, signUp);
  app.post('/api/v1/auth/signin', validateSigninCredentials, signIn);
  app.patch('/api/v1/users/:email/verify', isAdmin, validateVerifyEmail, verifyUser);
  app.get('/api/v1/users', isAdmin, getAllUsers);

  // Loans
  app.post('/api/v1/loans', validateApplyLoanCredentials, verifyToken, verifyLoanEmailExistence, applyLoan);
  app.get('/api/v1/loans', isAdmin, getAllLoans);
  app.get('/api/v1/loans?status=approved&repaid=true', isAdmin, getRepaidAndCurrentLoans);
  app.get('/api/v1/loans?status=approved&repaid=false', isAdmin, getRepaidAndCurrentLoans);
  app.get('/api/v1/loans/:id', isAdmin, getSpecificLoan);
  app.patch('/api/v1/loans/:loanid', isAdmin, approveReject);
  app.post('/api/v1/loans/:loanid/repayments', isAdmin, postPayment, postLoanRepayments);
  app.get('/api/v1/loans/:loanid/repayments', verifyToken, postPayment, getRepaymentRecord);
};

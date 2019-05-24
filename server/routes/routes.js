import express from 'express';
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
const router = express.Router();

router.post('/auth/signup', validateRegisterationCredentials, validateEmailExistence, signUp);
router.post('/auth/signin', validateSigninCredentials, signIn);
router.patch('/users/:email/verify', isAdmin, validateVerifyEmail, verifyUser);
router.get('/users', isAdmin, getAllUsers);

// Loans
router.post('/loans', validateApplyLoanCredentials, verifyToken, verifyLoanEmailExistence, applyLoan);
router.get('/loans', isAdmin, getAllLoans);
router.get('/loans?status=approved&repaid=true', isAdmin, getRepaidAndCurrentLoans);
router.get('/loans?status=approved&repaid=false', isAdmin, getRepaidAndCurrentLoans);
router.get('/loans/:id', isAdmin, getSpecificLoan);
router.patch('/loans/:loanid', isAdmin, approveReject);
router.post('/loans/:loanid/repayments', isAdmin, postPayment, postLoanRepayments);
router.get('/loans/:loanid/repayments', verifyToken, postPayment, getRepaymentRecord);

export default router;

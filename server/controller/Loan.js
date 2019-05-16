import loan from '../models/loans';
import loanRepaymentRecord from '../models/loanRepaymentRecord';
import Model from '../models/db';

const loan_model = new Model('users');

class Loan {
  static applyLoan(req, res) {
    const calcAmount = parseFloat(req.body.amount);
    const calcInterest = ((5 / 100) * calcAmount);
    const calcPaymentInstallment = parseFloat((calcAmount + calcInterest) / req.body.tenor);
    const getLoan = {
      id: loan.length + 1,
      user: req.body.email,
      createdOn: new Date(),
      tenor: req.body.tenor,
      amount: calcAmount,
      paymentInstallment: calcPaymentInstallment,
      status: 'pending', // should default to pendingm
      balance: calcAmount,
      interest: calcInterest,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };
    loan.push(getLoan);
    return res.status(200).json({
      message: 'loan application successful'
    });
  }

  static getRepaymentRecord(req, res) {
    const loanRecord = loanRepaymentRecord.find(user => user.loanId === parseInt((req.params.loanid), 10));

    if (!loanRecord) {
      return res.status(404).json({
        message: `loan with id:${req.params.loanid} not found`,
      });
    }
    return res.status(200).json({
      message: 'your loan repayment history',
      status: 200,
      data: loanRecord
    });
  }

  static getAllLoans(req, res) {
    return res.status(200).json({
      message: 'All loan applications',
      data: loan
    });
  }

  static getRepaidLoans(req, res) {
    const repaidLoan = loan.filter(user => (user.repaid === true && user.status === 'approved'));
    if (!repaidLoan) {
      return res.status(404).json({
        message: 'request not found'
      });
    }
    return res.status(200).json({
      message: 'All repaid loans',
      data: repaidLoan
    });
  }

  static getCurrentLoans(req, res) {
    const currentLoan = loan.filter(user => (user.repaid === false && user.status === 'approved'));
    if (!currentLoan) {
      return res.status(404).json({
        message: 'request not found'
      });
    }
    return res.status(200).json({
      message: 'All current loans',
      data: currentLoan
    });
  }

  static getSpecificLoan(req, res) {
    const specific = loan.find(user => user.id === parseInt((req.params.id), 10));

    if (!specific) {
      return res.status(404).json({
        message: 'wrong loan Id'
      });
    }

    return res.status(200).json({
      message: 'A specific loan application fetched',
      data: specific
    });
  }

  static approveReject(req, res) {
    const getLoanId = req.params.loanid;
    const getStatus = req.body.status;

    const app_rej = loan.find(user => (user.id === parseInt((getLoanId), 10)));

    app_rej.status = getStatus;
    return res.status(200).json({
      message: 'loan application approved',
      status: 200,
      data: {
        loanId: app_rej.id,
        loanAmount: app_rej.amount,
        tenor: app_rej.tenor,
        status: app_rej.status,
        monthlyInstallment: app_rej.paymentInstallment,
        interest: app_rej.interest,
        user: app_rej.user,
      },
    });
  }

  static postLOanRepayments(req, res) {
    const getLoanId = req.params.loanid;
    const paymentHistory = {
      id: loanRepaymentRecord.length + 1,
      createdOn: new Date(),
      loanId: Number(getLoanId),
      amount: req.body.amount,
      monthlyInstallment: req.body.monthlyInstallment,
      paidAmount: req.body.paidAmount,
      balance: parseFloat(req.body.balance),
    };
    loanRepaymentRecord.push(paymentHistory);
    return res.status(201).json({
      message: 'payment posting successful',
      status: 201,
      data: {
        id: paymentHistory.id,
        loanId: paymentHistory.loanId,
        createdOn: paymentHistory.createdOn,
        amount: paymentHistory.amount,
        monthlyInstallment: paymentHistory.monthlyInstallment,
        paidAmount: paymentHistory.paidAmount,
        balance: paymentHistory.balance,
      },
    });
  }
}

export default Loan;

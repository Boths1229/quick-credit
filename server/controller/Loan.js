import loan from '../models/loans';
//import Record from '../helper/Record';
import loanRepaymentRecord from '../models/loanRepaymentRecord';

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
     /* data: {
        loanId: getLoan.id,
        firstName: getLoan.firstname,
        lastName: getLoan.lastname,
        email: getLoan.email,
        tenor: getLoan.tenor,
        amount: getLoan.amount,
        paymentInstallment: getLoan.paymentInstallment,
        status: getLoan.status, // should default to pending
        balance: getLoan.balance,
        interest: getLoan.interest,
      },*/
    });
  }

  static getAllLoans(req, res) {
    return res.status(200).json({
      message: 'All loan applications',
      data: loan
    });
  }

  static getRepaidLoans(req, res) {
    const repaidLoan = loan.filter((user) => {
      return (user.repaid === true && user.status === 'approved')
    });
    if (!repaidLoan) {
      return res.status(404).json({
        message: 'request not found'
      })
    } 
    return res.status(200).json({
      message: 'All repaid loans',
      data: repaidLoan
    })
  
  }

  static getCurrentLoans(req, res) {
    const currentLoan = loan.filter((user) => {
      return (user.repaid === false && user.status === 'approved')
    });
    if(!currentLoan) {
      return res.status(404).json({
        message: 'request not found'
      })
    } 
    return res.status(200).json({
      message: 'All current loans',
      data: currentLoan
    })
  }

  static getSpecificLoan(req, res) {
    /*function getId(loan, loanId) {
      var obj = loan.filter(function (val) {
          return val.loanId === loanId;
      });
  
      // Filter returns an array, and we just want the matching item.
      return obj[0];
  }*/
    const specific = loan.find(user => user.id === parseInt((req.params.id), 10));
    // specific loan not found
    if (!specific) {
      return res.status(404).json({
        message: 'wrong loan Id'
      });
    }
    // specific loan found
    return res.status(200).json({
      message: 'A specific loan application fetched',
      data: specific
    });
  }

  static approveReject(req, res) {
    // request params for loanid
    const getLoanId = req.params.loanid;
    const getStatus = req.body.status;
    // search for loan with loan-id
    const app_rej = loan.find(user => (user.id === parseInt((getLoanId), 10)));
    // Update loan status
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
    // request params for loanid
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

  static getRepaymentRecord(req, res) {
    const loanRecord = loanRepaymentRecord.find(user => user.loanId === parseInt((req.params.loanid), 10));
    //  loan history not found
    if (!loanRecord) {
      return res.status(404).json({
        message: `loan with id:${req.params.loanid} not found`,
      });
    }

   /* const newRecord = {
      loanid: loanRecord.loanid,
      createdOn: loanRecord.createdOn,
      monthlyInstallment: loanRecord.monthlyInstallment,
      amount: loanRecord.amount,
      paidAmount: loanRecord.paidAmount,
      balance: loanRecord.balance,
    };*/
    // loan repayment history found
    return res.status(200).json({
      message: 'your loan repayment history',
      status: 200,
      data: loanRecord
    });
  }
}

export default Loan;

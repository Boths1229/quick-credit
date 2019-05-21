import uuid from 'uuid';
import loan from '../models/loans';
import loanRepaymentRecord from '../models/loanRepaymentRecord';
import Model from '../models/db';


class Loan {
  static model() {
    return new Model('loans');
  }

  static async applyLoan(req, res) {
    const { email, amount, bankName, accountNumber, tenor } = req.body;
    const calcAmount = parseFloat(req.body.amount);
    const calcInterest = ((5 / 100) * calcAmount);
    const calcPaymentInstallment = parseFloat((calcAmount + calcInterest) / req.body.tenor);
    const { rows } = await Loan.model().insert(
      'email, firstName, lastName, tenor, amount, paymentInstallment, interest, bankName, accountNumber',
      `'${req.user.email}', '${req.user.firstname}', '${req.user.lastname}', '${tenor}', '${amount}', '${calcPaymentInstallment}', '${calcInterest}', '${bankName}', '${accountNumber}'`
    );
console.log(firstName);
    return res.status(201).json({
      status: 201,
      data: {
        id: uuid(), // id of newly created user
        firstName: req.user.firstname,
        lastName: req.user.lastname,
        email: req.user.email,
        tenor: req.body.tenor,
        amount: req.body.amount,
        bankName: req.body.bankName,
        accountNumber: req.body.accountNumber,
        paymentInstallment: calcPaymentInstallment,
        interest: calcInterest,
        createdon: new Date()
      }
    });
  }

  static async getAllLoans(req, res) {
    const rows = await Loan.model().select('id, loanid, firstname, lastname, email, tenor, amount, paymentinstallment, status, repaid, createdon');
    try {
      if (rows.length === 0) {
        return res.status(400).json({
          message: 'No user found'
        });
      }

      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (e) {
      return res.status(500).json({
        message: 'server error'
      });
    }
  }

  static async getSpecificLoan(req, res) {
    const { id } = req.params;
    const rows = await Loan.model().select('id, loanid, firstname, lastname, email, tenor, amount, paymentinstallment, status, repaid, createdon', `id=${id}`);
    try {
      if (rows.length === 0) {
        return res.status(400).json({
          message: 'No user found'
        });
      }

      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (e) {
      return res.status(500).json({
        message: 'server error'
      });
    }
  }

  static async approveReject(req, res) {
    try {
      const { loanid } = req.params;
      const rows = await Loan.model().update('status=$1', 'loanid=$2', ['approved', loanid]);
      // console.log(`${req.params.email}`, rows);
      if (rows[0]) {
        return res.status(200).json({
          status: 200,
          data: {
            loanId: rows[0].loanid,
            amount: rows[0].amount,
            tenor: rows[0].tenor,
            status: rows[0].status,
            paymentInstallment: rows[0].paymentinstallment,
            interest: rows[0].interest,
            createdOn: rows[0].createdon,
          },
        });
      }
      return res.status(404).json({
        message: 'email not found'
      });
    } catch (e) {
      return res.status(500).json({
        error: 'server error'
      });
    }
  }

  static async getRepaidAndCurrentLoans(req, res) {
    const { repaid } = req.query;
    const rows = await Loan.model().select('*', 'status=approved and repaid=$1', [repaid]);
    try {
      if (rows.length === 0) {
        return res.status(404).json({
          message: 'No user found'
        });
      }

      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (e) {
      return res.status(500).json({
        error: 'server error'
      });
    }
  }

  // static getCurrentLoans(req, res) {
  //   const currentLoan = loan.filter(user => (user.repaid === false && user.status === 'approved'));
  //   if (!currentLoan) {
  //     return res.status(404).json({
  //       message: 'request not found'
  //     });
  //   }
  //   return res.status(200).json({
  //     message: 'All current loans',
  //     data: currentLoan
  //   });
  // }

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
}

export default Loan;

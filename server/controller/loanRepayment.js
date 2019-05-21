import uuid from 'uuid';
import loan from '../models/loans';
import loanRepaymentRecord from '../models/loanRepaymentRecord';
import Model from '../models/db';


class LoanRepayment {
  static model() {
    return new Model('loanRepayment');
  }

  // static async getRepaidAndCurrentLoans(req, res) {
  //   const { repaid } = req.query;
  //   const rows = await LoanRepayment.model().select('*', 'status=approved and repaid=$1', [repaid]);
  //   try {
  //     if (rows.length === 0) {
  //       return res.status(404).json({
  //         message: 'No user found'
  //       });
  //     }

  //     return res.status(200).json({
  //       status: 200,
  //       data: rows
  //     });
  //   } catch (e) {
  //     return res.status(500).json({
  //       error: 'server error'
  //     });
  //   }
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

export default LoanRepayment;

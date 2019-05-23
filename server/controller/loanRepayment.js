import Model from '../models/db';


class LoanRepayment {
  static model() {
    return new Model('loanRepayment');
  }

  static loans() {
    return new Model('loans');
  }

  static async postLoanRepayments(req, res) {
    try {
      const { paidAmount } = req.body;
      const monthlyInstallment = req.loan.paymentinstallment;
      if (req.loan.status !== 'approved') {
        return res.status(409).json({
          message: `this loanid ${req.body.loanid} is not yet approved`
        });
      }
      if (parseFloat(paidAmount) !== parseFloat(monthlyInstallment)) {
        return res.status(409).json({
          message: `you are expected to pay ${monthlyInstallment}`
        });
      }

      const rows = await LoanRepayment.model().insert('loanid, amount', '$1, $2', [req.loan.loanid, paidAmount]);
      const newRepayment = rows;

      req.loan.balance -= paidAmount;

      const loan = await LoanRepayment.updateLoanAfterRepayment(req.loan.loanid, req.loan.balance);

      return res.status(200).json({
        status: 200,
        data: {
          id: newRepayment.id,
          loanId: req.loan.loanid,
          createdon: newRepayment.createdon,
          amount: loan.amount,
          monthlyInstallment: loan.paymentinstallment,
          paidAmount: newRepayment.amount,
          balance: loan.balance,
          status: loan.status,
          repaid: loan.repaid
        }
      });
    } catch (e) {
      return res.status(500).json({
        message: 'server error'
      });
    }
  }

  static async updateLoanAfterRepayment(loanid, balance) {
    try {
      const updatedLoan = {};
      if (balance < 1) {
        const rows = await LoanRepayment.loans().update('balance=$1, repaid=$2', 'id=$3', [balance, true, loanid]);

        return rows;
      }
      // eslint-disable-next-line no-undef
      const rows = await LoanRepayment.loans().update('balance=$1', 'id=$2', [balance, loanid]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async getRepaymentRecord(req, res) {
    try {
      const rows = await LoanRepayment.loans().select('loanid, createdon, paymentinstallment, amount, balance', `id=${req.loan.loanid}`);
      if (rows.length === 0) {
        return res.status(400).json({
          message: 'loan repayment not found'
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
}

export default LoanRepayment;

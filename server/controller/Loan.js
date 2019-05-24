import uuid from 'uuid';
import Model from '../models/db';


class Loan {
  static model() {
    return new Model('loans');
  }

  static async applyLoan(req, res) {
    try {
      const {
        amount, bankName, accountNumber, tenor
      } = req.body;
      const calcAmount = parseFloat(req.body.amount);
      const calcInterest = (0.05 * calcAmount);
      const calcPaymentInstallment = parseFloat((calcAmount + calcInterest) / req.body.tenor);
      const balance = calcAmount + calcInterest;
      const newLoan = await Loan.model().insert(
        'email, firstname, lastname, tenor, amount, paymentinstallment, interest, bankname, accountnumber, balance',
        '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10',
        [req.user.email, req.user.firstname, req.user.lastname, tenor, amount, calcPaymentInstallment, calcInterest, bankName, accountNumber, balance]
      );
      console.log(req.user.firstname);
      return res.status(201).json({
        status: 201,
        message: 'loan application successful',
        data: {
          id: uuid(),
          firstName: newLoan.firstname,
          lastName: newLoan.lastname,
          email: newLoan.email,
          tenor: newLoan.tenor,
          amount: newLoan.amount,
          bankName: newLoan.bankName,
          accountNumber: newLoan.accountNumber,
          paymentInstallment: calcPaymentInstallment,
          balance,
          interest: calcInterest,
          createdOn: newLoan.createdon,
        }
      });
    } catch (e) {
      return res.status(500).json({
        message: 'server error'
      });
    }
  }

  static async getAllLoans(req, res) {
    try {
      const rows = await Loan.model().select('id, loanid, firstname, lastname, email, tenor, amount, paymentinstallment, status, repaid, createdon');
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
    try {
      const { id } = req.params;
      const rows = await Loan.model().select('id, loanid, firstname, lastname, email, tenor, amount, paymentinstallment, status, repaid, createdon', `id=${id}`);
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

      if (rows) {
        return res.status(200).json({
          status: 200,
          data: {
            loanId: rows.loanid,
            amount: rows.amount,
            tenor: rows.tenor,
            status: rows.status,
            paymentInstallment: rows.paymentinstallment,
            interest: rows.interest,
            createdOn: rows.createdon,
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
    try {
      const { repaid } = req.query;
      const rows = await Loan.model().select('*', 'status=approved and repaid=$1', [repaid]);
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
}

export default Loan;
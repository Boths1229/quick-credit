import Model from '../models/db';

const model = new Model('loans');

const postPayment = async (req, res, next) => {
  try {
    const loanId = req.params.loanid;
    const loan = await model.select('*', 'loanid=$1', [loanId]);

    if (!loan) {
      return res.status(404).json({
        message: 'Loan not found'
      });
    }
    req.loan = loan;
    next();
  } catch (e) {
    return res.status(500).json({
      message: 'server error'
    });
  }
};

export default postPayment;

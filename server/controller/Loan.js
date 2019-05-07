import loan from '../dummy/loan';

class Loan {
    static async applyLoan(req, res) {
        const { current_loan } = req.body;
        if (current_loan === 'true') {
          return res.status(400).json({
            message: 'loan application unsuccessful'
          });
        }
        loan.push({
          ...req.body
        });
        return res.status(200).json({
          message: 'loan application successful',
        });
   }
}

export default Loan;
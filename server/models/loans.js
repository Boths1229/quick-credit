const loans = [
  {
    loanId: 1,
    id: 1,
    firstName: 'chukwuma',
    lastName: 'Emmanuel',
    email: 'boths104@example.com',
    repaid: true,
    tenor: '3 months',
    amount: 10000.00,
    paymentInstallment: 2000.00,
    status: 'approved', // should default to pending
    balance: 0,
    interest: 5000,
    createdOn: Date()
  },
  {
    loanId: 2,
    id: 2,
    firstName: 'kene',
    lastName: 'Bryan',
    email: 'kene4@example.com',
    repaid: false,
    tenor: '5 months',
    amount: 100000.00,
    paymentInstallment: 20000.00,
    status: 'approved', // should default to pending
    balance: 0,
    interest: 5000,
    createdOn: Date()
  },
  {
    loanId: 3,
    id: 3,
    firstName: 'Sonma',
    lastName: 'Eyiokwa',
    email: 'sonma4@example.com',
    repaid: false,
    tenor: '1 months',
    amount: 40000.00,
    paymentInstallment: 4000.00,
    status: 'approved', // should default to pending
    balance: 0,
    interest: 5000,
    createdOn: Date()
  }
];

export default loans;

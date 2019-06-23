const loans = [
  {
    loanId: 1,
    firstName: 'ejike',
    lastName: 'igboko',
    email: 'ejike112@yahoo.com',
    tenor: '6',
    amount: 50000.00,
    paymentInstallment: 8750,
    status: 'pending', // should default to pending
    repaid: false,
    balance: 0,
    interest: 2500,
    bankName: 'gtbank',
    accountNumber: 233434555
  },
  {
    loanId: 1,
    firstName: '',
    lastName: 'Emmanuel',
    email: 'boths104@example.com',
    tenor: '3 months',
    amount: 10000.00,
    paymentInstallment: 2000.00,
    status: 'pending', // should default to pending
    repaid: false,
    balance: 0,
    interest: 5000,
    bankName: 'gtbank',
    accountNumber: ''
  },
  {
   paidAmount: 15750
  }
];

export default loans;

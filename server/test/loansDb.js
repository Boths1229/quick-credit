import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const { expect } = chai;


describe('Mark a user verified api/v1/users/:user-email/verify', () => {
  it('should return verify successful', (done) => {
    chai.request(server)
      .patch('/api/v1/users/kene@example.com/verify')
      .set('Accept', 'application/json')
      .send({
        status: 'verified'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('addresses verified');
        setImmediate(done);
      });
  });
});

describe('Mark a user as unverified api/v1/users/:user-email/verify', () => {
  it('should return verify unsuccessful', (done) => {
    chai.request(server)
      .patch('/api/v1/users/both104@example/verify')
      .set('Accept', 'application/json')
      .send({
        homeAddress: '34 epe str',
        organizationAddress: '01 broad str',
        status: 'unverified'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('addresses not verified');
        setImmediate(done);
      });
  });
});

describe('POST loan application /api/v1/loans', () => {
  it('should return loan application successful', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .set('Accept', 'application/json')
      .send({
        loanId: 1,
        firstName: 'chukwuma',
        lastName: 'Emmanuelgt',
        email: 'boths104@example.com',
        valid: 'false',
        tenor: '3 months',
        amount: 10000.00,
        paymentInstallment: 2000.00,
        status: 'pending', // should default to pending
        balance: 0,
        interest: 5000,
        bank_details: {
          name: 'chukwuma',
          bank_name: 'gtbank',
          account_number: '1234567676554'
        }
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('loan application successful');
        setImmediate(done);
      });
  });
});

describe('POST should return loan application details incomplete /api/v1/loans', () => {
  it('should return error when application details is incomplete', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .set('Accept', 'application/json')
      .send({
        loanId: 1,
        firstName: '',
        lastName: 'Emmanuel',
        email: 'boths104@example.com',
        valid: 'false',
        tenor: '3 months',
        amount: 10000.00,
        paymentInstallment: 2000.00,
        status: 'pending', // should default to pending
        balance: 0,
        interest: 5000,
        bank_details: {
          name: 'chukwuma',
          bank_name: 'gtbank',
          account_number: ''
        }
      })
      .end((err, res) => {
        const {
          firstName, 'bank_details.account_number': account_number
        } = res.body.errors;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(firstName[0]).to.equal('the firstName is required');
        expect(account_number[0]).to.equal('the bank details.account number is required');
        setImmediate(done);
      });
  });
});

describe('User GET loan repayment history /api/v1/loans/:loan-id/repayments', () => {
  it('should return your repayment history', (done) => {
    chai.request(server)
      .get('/api/v1/loans/3/repayments')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('your loan repayment history');
        setImmediate(done);
      });
  });
});


describe('GET all loan application /api/v1/loans', () => {
  it('should return all loan applications', (done) => {
    chai.request(server)
      .get('/api/v1/loans')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('All loan applications');
        setImmediate(done);
      });
  });
});

describe('GET all repaid loan application /api/v1/loans?status=approved&repaid=true', () => {
  it('should return all repaid loans', (done) => {
    chai.request(server)
      .get('/api/v1/repaidLoans')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('All repaid loans');
        setImmediate(done);
      });
  });
});

describe('GET all current loan application /api/v1/loans?status=approved&repaid=false', () => {
  it('should return All loans not fully repaid', (done) => {
    chai.request(server)
      .get('/api/v1/currentLoans')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('All current loans');
        setImmediate(done);
      });
  });
});

describe('GET a specific loan application /api/v1/loans/:loan-id', () => {
  it('should return a specific loan application fetched', (done) => {
    chai.request(server)
      .get('/api/v1/loans/1')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('A specific loan application fetched');
        setImmediate(done);
      });
  });
});

describe('GET a specific loan application with a wrong ID /api/v1/loans/:loan-id', () => {
  it('should return loanID error', (done) => {
    chai.request(server)
      .get('/api/v1/loans/10')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('wrong loan Id');
        setImmediate(done);
      });
  });
});

describe('PATCH Approve/Reject loan application /api/v1/loans/:loan-id', () => {
  it('should return loan application approved', (done) => {
    chai.request(server)
      .patch('/api/v1/loans/3')
      .set('Accept', 'application/json')
      .send({
        status: 'approved', // pending, approved, rejected
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('loan application approved');
        setImmediate(done);
      });
  });
});

describe('POST /loans repayment record /api/v1/loans/:loan-id/repayments', () => {
  it('should return client loan payment posting successful', (done) => {
    chai.request(server)
      .post('/api/v1/loans/1/repayments')
      .set('Accept', 'application/json')
      .send({
        id: 1,
        loanId: 12,
        createdOn: '12-33-3000 12:33pm',
        amount: 10000.00,
        monthlyInstallment: 2000.00,
        paidAmount: 2000.00,
        balance: 8000.00,
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('payment posting successful');
        setImmediate(done);
      });
  });
});

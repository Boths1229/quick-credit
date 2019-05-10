import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST sign up successful api/v1/auth/signup', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return signup successful', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('authorization', token)
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstname: 'sonmajkkl',
        lastname: 'Enyiokwakll',
        homeAddress: '3755 diamond str',
        organization: 'sonmahjb integrated',
        organizationAddress: '2t tope str',
        age: 21,
        email: 'sonmhha@example.com',
        password: 'sonma123mmn',
        imageUrl: 'www.imageUrl.com',
        status: 'unverified', // unverified or verified
        isAdmin: false,
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Signup successful');
        setImmediate(done);
      });
  });
});
describe('POST email already in use api/v1/auth/signup', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return user with this email already exist', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstname: 'sonmajkkl',
        lastname: 'Enyiokwakll',
        homeAddress: '3755 diamond str',
        organization: 'sonmahjb integrated',
        organizationAddress: '2t tope str',
        age: 21,
        email: 'sonmhha@example.com',
        password: 'sonma123mmn',
        imageUrl: 'www.imageUrl.com',
        status: 'unverified', // unverified or verified
        isAdmin: false,
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal('this email is already in use');
        setImmediate(done);
      });
  });
});
describe('POST sign up details in incomplete api/v1/auth/signup', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return error when user signup details is incomplete', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstname: '',
        lastname: 'Enyiokwakll',
        homeAddress: '3755 diamond str',
        organization: 'sonmahjb integrated',
        organizationAddress: '2t tope str',
        age: 21,
        email: '',
        password: 'sonma123mmn',
        imageUrl: 'www.imageUrl.com',
        status: 'unverified', // unverified or verified
        isAdmin: false,
      })
      .end((err, res) => {
        const {
          firstname, email
        } = res.body.errors;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(firstname[0]).to.equal('the firstname is required');
        expect(email[0]).to.equal('the email is required');
        setImmediate(done);
      });
  });
});

describe('POST should return email is invalid api/v1/auth/signup', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return error when email is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('authorization', token)
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstname: 'sonmajkkl',
        lastname: 'Enyiokwakll',
        homeAddress: '3755 diamond str',
        organization: 'sonmahjb integrated',
        organizationAddress: '2t tope str',
        age: 21,
        email: 'sonmhha',
        password: 'sonma123mmn',
        imageUrl: 'www.imageUrl.com',
        status: 'unverified', // unverified or verified
        isAdmin: false,
      })
      .end((err, res) => {
        const {
          email
        } = res.body.errors;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(email[0]).to.equal('the email format is invalid');
        setImmediate(done);
      });
  });
});

describe('POST should return password length is less than 6 or invalid api/v1/auth/signup', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return error when password length is less than 6 or invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('authorization', token)
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstname: 'sonmajkkl',
        lastname: 'Enyiokwakll',
        homeAddress: '3755 diamond str',
        organization: 'sonmahjb integrated',
        organizationAddress: '2t tope str',
        age: 21,
        email: 'sonmhha@example.com',
        password: 'so',
        imageUrl: 'www.imageUrl.com',
        status: 'unverified', // unverified or verified
        isAdmin: false,
      })
      .end((err, res) => {
        const {
          password
        } = res.body.errors;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(password[0]).to.equal('Min password limit is 6');
        setImmediate(done);
      });
  });
});

describe('POST should return error when age field is not filled api/v1/auth/signup', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return error when age field is not filled', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('authorization', token)
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstname: 'sonmajkkl',
        lastname: 'Enyiokwakll',
        homeAddress: '3755 diamond str',
        organization: 'sonmahjb integrated',
        organizationAddress: '2t tope str',
        email: 'sonmhha@example.com',
        password: 'sonma123mmn',
        imageUrl: 'www.imageUrl.com',
        status: 'unverified', // unverified or verified
        isAdmin: false,
      })
      .end((err, res) => {
        const {
          age
        } = res.body.errors;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(age[0]).to.equal('Min age limit is 18');
        setImmediate(done);
      });
  });
});

describe('POST should return you are not up to age to apply', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return error when you are not up to age to apply', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('authorization', token)
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstname: 'sonmajkkl',
        lastname: 'Enyiokwakll',
        homeAddress: '3755 diamond str',
        organization: 'sonmahjb integrated',
        organizationAddress: '2t tope str',
        age: 15,
        email: 'sonmhha@example.com',
        password: 'sonma123mmn',
        imageUrl: 'www.imageUrl.com',
        status: 'unverified', // unverified or verified
        isAdmin: false,
      })
      .end((err, res) => {
        const {
          age
        } = res.body.errors;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(age[0]).to.equal('Min age limit is 18');
        setImmediate(done);
      });
  });
});

describe('POST api/v1/auth/signin', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return signin successful', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'boths104@example.com',
        password: 'developer'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('signin successful');
        setImmediate(done);
      });
  });
});

describe('Sign in a user with invalid input values api/v1/auth/signin', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return error when invalid details', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'both100@example.com',
        password: 'develops'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('invalid email or password');
        setImmediate(done);
      });
  });
});

describe('POST should return email field not filled api/v1/auth/signin', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return error when email field is not filled', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: '',
        password: 'developer'
      })
      .end((err, res) => {
        const {
          email
        } = res.body.errors;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        setImmediate(done);
      });
  });
});

describe('POST should return email format incorrect api/v1/auth/signin', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return error when email format is incorrect', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'boths104',
        password: 'developer'
      })
      .end((err, res) => {
        const {
          email
        } = res.body.errors;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        setImmediate(done);
      });
  });
});

describe('POST should return password field not filled api/v1/auth/signin', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return error when password field is not filled', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'boths104@example.com',
        password: ''
      })
      .end((err, res) => {
        const {
          password
        } = res.body.errors;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        setImmediate(done);
      });
  });
});

describe('POST should return password incorrect api/v1/auth/signin', () => {
  const token = 'ajdsdkdk.akskks29030303umds.s';
  it('should return error when password is incorrect', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'boths104@example.com',
        password: 'dev'
      })
      .end((err, res) => {
        const {
          password
        } = res.body.errors;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        setImmediate(done);
      });
  });
});

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

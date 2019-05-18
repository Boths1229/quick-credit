import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST sign up successful api/v1/auth/signup', () => {
  it('should return signup successful', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstName: 'amaka',
        lastName: 'chuks',
        homeAddress: 'canada',
        organization: 'vals ltd',
        organizationAddress: 'toronto',
        age: 29,
        email: 'amaka@yahoo.com',
        password: 'amaka000',
        imageUrl: 'www.imageUrl.com',
        status: 'unverified', // unverified or verified
        isAdmin: false,
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.status).to.equal(201);
        expect(res.body.data.firstName).to.equal('amaka');
        expect(res.body.data.lastName).to.equal('chuks');
        expect(res.body.data.email).to.equal('amaka@yahoo.com');
        setImmediate(done);
      });
  });
});
describe('POST email already in use api/v1/auth/signup', () => {
  it('should return user with this email already exist', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstName: 'sonmajkkl',
        lastName: 'Enyiokwakll',
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
  it('should return error when user signup details is incomplete', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstName: '',
        lastName: 'Enyiokwakll',
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
          firstName, email
        } = res.body.errors;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(firstName[0]).to.equal('the firstName is required');
        expect(email[0]).to.equal('the email is required');
        setImmediate(done);
      });
  });
});

describe('POST should return email is invalid api/v1/auth/signup', () => {
  it('should return error when email is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstName: 'sonmajkkl',
        lastName: 'Enyiokwakll',
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
  it('should return error when password length is less than 6 or invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstName: 'sonmajkkl',
        lastName: 'Enyiokwakll',
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
  it('should return error when age field is not filled', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstName: 'sonmajkkl',
        lastName: 'Enyiokwakll',
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
  it('should return error when you are not up to age to apply', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        id: 53,
        firstName: 'sonmajkkl',
        lastName: 'Enyiokwakll',
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
  it('should return signin successful', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        firstName: 'Adeogo',
        lastName: 'Adejana',
        email: 'hardecx@andela.com',
        password: 'tabayaba'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.status).to.equal(200);
        expect(res.body.data.firstName).to.equal('Adeogo');
        expect(res.body.data.lastName).to.equal('Adejana');
        expect(res.body.data.email).to.equal('hardecx@andela.com');
        setImmediate(done);
      });
  });
});

describe('POST invalid input values api/v1/auth/signin', () => {
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
        expect(res.statusCode).to.equal(401);
        expect(res.body.message).to.equal('invalid email or password');
        setImmediate(done);
      });
  });
});

describe('POST should return email field not filled api/v1/auth/signin', () => {
  it('should return error when email field is not filled', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: '',
        password: 'developer'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        setImmediate(done);
      });
  });
});

describe('POST should return email format incorrect api/v1/auth/signin', () => {
  it('should return error when email format is incorrect', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'boths104',
        password: 'developer'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        setImmediate(done);
      });
  });
});

describe('POST should return password field not filled api/v1/auth/signin', () => {
  it('should return error when password field is not filled', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'boths104@example.com',
        password: ''
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        setImmediate(done);
      });
  });
});

describe('POST should return password incorrect api/v1/auth/signin', () => {
  it('should return error when password is incorrect', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'boths104@example.com',
        password: 'dev'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        setImmediate(done);
      });
  });
});

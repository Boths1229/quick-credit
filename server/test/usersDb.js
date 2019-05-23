import chai from 'chai';
import chaiHttp from 'chai-http';
import { exec } from 'child_process';
import server from '../app';
import users from '../models/users';


chai.use(chaiHttp);

const { expect } = chai;
describe('User test', () => {
  before((done) => {
    const dump = 'psql -h localhost -d testdb -U postgres -f server/test/testdb.sql';
    exec(dump, (err) => {
      done();
    });
  });

  describe('POST sign up successful api/v1/auth/signup', () => {
    it('should return signup successful', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[0])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.status).to.equal(201);
          expect(res.body.data.firstName).to.equal('ejike');
          expect(res.body.data.lastName).to.equal('igboko');
          expect(res.body.data.email).to.equal('ejike1123@yahoo.com');
          done();
        });
    });
  });
  describe('POST email already in use api/v1/auth/signup', () => {
    it('should return user with this email already exist', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[1])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(409);
          expect(res.body.message).to.equal('this email is already in use');
          done();
        });
    });
  });
  describe('POST sign up details in incomplete api/v1/auth/signup', () => {
    it('should return error when user signup details is incomplete', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[2])
        .end((err, res) => {
          const {
            firstName, email
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(firstName[0]).to.equal('the firstName is required');
          expect(email[0]).to.equal('the email is required');
          done();
        });
    });
  });

  describe('POST should return email is invalid api/v1/auth/signup', () => {
    it('should return error when email is invalid', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[3])
        .end((err, res) => {
          const {
            email
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(email[0]).to.equal('the email format is invalid');
          done();
        });
    });
  });

  describe('POST should return password length is less than 6 or invalid api/v1/auth/signup', () => {
    it('should return error when password length is less than 6 or invalid', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[4])
        .end((err, res) => {
          const {
            password
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(password[0]).to.equal('Min password limit is 6');
          done();
        });
    });
  });

  describe('POST should return error when age field is not filled api/v1/auth/signup', () => {
    it('should return error when age field is not filled', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[5])
        .end((err, res) => {
          const {
            age
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(age[0]).to.equal('Min age limit is 18');
          done();
        });
    });
  });

  describe('POST should return you are not up to age to apply', () => {
    it('should return error when you are not up to age to apply', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[6])
        .end((err, res) => {
          const {
            age
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(age[0]).to.equal('Min age limit is 18');
          done();
        });
    });
  });

  describe('POST api/v1/auth/signin', () => {
    it('should return signin successful', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[7])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.status).to.equal(200);
          expect(res.body.data.firstName).to.equal('ejike');
          expect(res.body.data.lastName).to.equal('igboko');
          expect(res.body.data.email).to.equal('ejike112@yahoo.com');
          done();
        });
    });
  });

  describe('POST invalid input values api/v1/auth/signin', () => {
    it('should return error when invalid details', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[8])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(401);
          expect(res.body.message).to.equal('invalid email or password');
          done();
        });
    });
  });

  describe('POST should return email field not filled api/v1/auth/signin', () => {
    it('should return error when email field is not filled', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[9])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Invalid Credentials');
          done();
        });
    });
  });

  describe('POST should return email format incorrect api/v1/auth/signin', () => {
    it('should return error when email format is incorrect', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[10])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Invalid Credentials');
          done();
        });
    });
  });

  describe('POST should return password field not filled api/v1/auth/signin', () => {
    it('should return error when password field is not filled', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[11])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Invalid Credentials');
          done();
        });
    });
  });

  describe('POST should return password incorrect api/v1/auth/signin', () => {
    it('should return error when password is incorrect', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[12])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Invalid Credentials');
          done();
        });
    });
  });

  describe('Mark a user verified api/v1/users/:email/verify', () => {
    it('should return verify successful', (done) => {
      chai.request(server)
        .patch('/api/v1/users/boths1040@yahoo.com/verify')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.data.email).to.equal('boths1040@yahoo.com');
          expect(res.body.data.firstName).to.equal('Ade');
          expect(res.body.data.lastName).to.equal('Adeja');
          expect(res.body.data.homeaddress).to.equal('oniru');
          expect(res.body.data.organizationaddress).to.equal('123 broad street');
          expect(res.body.data.status).to.equal('verified');
          done();
        });
    });
  });

  describe('Mark a user as unverified api/v1/users/:email/verify', () => {
    it('should return verify unsuccessful', (done) => {
      chai.request(server)
        .patch('/api/v1/users/bo4@example/verify')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('email not found');
          done();
        });
    });
  });
});

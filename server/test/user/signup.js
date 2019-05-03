import chai from 'chai';
import server from '../../app';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

const { expect } = chai;

describe('Sign up Routes /api/v1/user/signup', () => {
    it('should return signup successful', (done) => {
      chai.request(server)
          .post('/api/v1/user/signup')
          .set('Accept', 'application/json')
          .send({
            name: 'chukwuma',
            age: 22,
            email: 'boths104@example.com',
            password: 'developer',
            imageUrl: 'www.imageUrl.com'
          })
          .end((err, res) => {
           expect(res.body).to.be.an('object')
           expect(res.statusCode).to.equal(201)
           expect(res.body.message).to.equal('Signup successful')
            setImmediate(done)
          })
    });
    it('should return user with this email already exist', (done) => {
        chai.request(server)
            .post('/api/v1/user/signup')
            .set('Accept', 'application/json')
            .send({
              name: 'chukwuma',
              age: 22,
              email: 'boths104@example.com',
              password: 'developer',
              imageUrl: 'www.imageUrl.com'
            })
            .end((err, res) => {
             expect(res.body).to.be.an('object')
             expect(res.statusCode).to.equal(409)
             expect(res.body.message).to.equal('this email is already in use')
              setImmediate(done)
            })
      });
      it('should return error when user signup details is incomplete', (done) => {
        chai.request(server)
            .post('/api/v1/user/signup')
            .set('Accept', 'application/json')
            .send({
              name: '',
              age: 22,
              email: '',
              password: 'developer',
              imageUrl: 'www.imageUrl.com'
            })
            .end((err, res) => {
                const {
                    name, email
                } = res.body.errors;
                expect(res.body).to.be.an('object')
                expect(res.statusCode).to.equal(400)
                expect(name[0]).to.equal('the name is required')
                expect(email[0]).to.equal('the email is required')
                 setImmediate(done)
            })
      });
      it('should return error when email is invalid', (done) => {
        chai.request(server)
            .post('/api/v1/user/signup')
            .set('Accept', 'application/json')
            .send({
              name: 'chukwuma',
              age: 22,
              email: 'boths104',
              password: 'developer',
              imageUrl: 'www.imageUrl.com'
            })
            .end((err, res) => {
                const {
                    email
                } = res.body.errors
                expect(res.body).to.be.an('object')
                expect(res.statusCode).to.equal(400)
                expect(email[0]).to.equal('the email format is invalid')
                 setImmediate(done)
            })
      });
      it('should return error when password length is less than 6 or invalid', (done) => {
        chai.request(server)
            .post('/api/v1/user/signup')
            .set('Accept', 'application/json')
            .send({
              name: 'chukwuma',
              age: 22,
              email: 'boths104@example.com',
              password: 'dev',
              imageUrl: 'www.imageUrl.com'
            })
            .end((err, res) => {
                const {
                    password
                } = res.body.errors
                expect(res.body).to.be.an('object')
                expect(res.statusCode).to.equal(400)
                expect(password[0]).to.equal('Min password limit is 6')
                 setImmediate(done)
            })
      });
      it('should return error when age field is not filled', (done) => {
        chai.request(server)
            .post('/api/v1/user/signup')
            .set('Accept', 'application/json')
            .send({
              name: 'chukwuma',
              email: 'boths104@example.com',
              password: 'dev',
              imageUrl: 'www.imageUrl.com'
            })
            .end((err, res) => {
                const {
                    age
                } = res.body.errors
                expect(res.body).to.be.an('object')
                expect(res.statusCode).to.equal(400)
                expect(age[0]).to.equal('Min age limit is 18')
                 setImmediate(done)
            })
      });
      it('should return you are not up to age to apply', (done) => {
        chai.request(server)
            .post('/api/v1/user/signup')
            .set('Accept', 'application/json')
            .send({
              name: 'chukwuma',
              age: 17,
              email: 'boths104@example.com',
              password: 'dev',
              imageUrl: 'www.imageUrl.com'
            })
            .end((err, res) => {
                const {
                    age
                } = res.body.errors
                expect(res.body).to.be.an('object')
                expect(res.statusCode).to.equal(400)
                expect(age[0]).to.equal('Min age limit is 18')
                 setImmediate(done)
            })
      });
});

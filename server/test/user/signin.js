import chai from 'chai';
import server from '../../app';
import chaiHttp from 'chai-http';
import data from '../__mock__/userData';
chai.use(chaiHttp);

const { expect } = chai;

const { signin } = data;

describe('Sign in Routes api/v1/auth/signin', () => {
    it('should return signin successful', (done) => {
    chai.request(server)
    .post('/api/v1/auth/signin')
    .set('Accept', 'application/json')
    .send(signin)
    .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.statusCode).to.equal(200)
        expect(res.body.message).to.equal('signin successful')
        setImmediate(done)
    })
    });
    it('should return email field not filled', (done) => {
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
        expect(res.body).to.be.an('object')
        expect(res.statusCode).to.equal(400)
        expect(res.body.message).to.equal('Invalid Credentials')
        setImmediate(done)
    })
});
it('should return email format incorrect', (done) => {
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
        expect(res.body).to.be.an('object')
        expect(res.statusCode).to.equal(400)
        expect(res.body.message).to.equal('Invalid Credentials')
        setImmediate(done)
    })
});
it('should return password field not filled', (done) => {
    chai.request(server)
    .post('/api/v1/auth/signin')
    .set('Accept', 'application/json')
    .send({
        email: 'boths104@example.com',
        password: '',
    })
    .end((err, res) => {
        const { 
            password
        } = res.body.errors;
        expect(res.body).to.be.an('object')
        expect(res.statusCode).to.equal(400)
        expect(res.body.message).to.equal('Invalid Credentials')
        setImmediate(done)
    
    })
});
it('should return password incorrect', (done) => {
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
        expect(res.body).to.be.an('object')
        expect(res.statusCode).to.equal(400)
        expect(res.body.message).to.equal('Invalid Credentials')
        setImmediate(done)
    })
});
it('should return invalid details', (done) => {
    chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send({
        email: 'both100@example.com',
        password: 'develops'
    })
    .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.statusCode).to.equal(409)
        expect(res.body.message).to.equal('invalid email or password')
        setImmediate(done)
    })
 });
})

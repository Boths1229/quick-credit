import chai from 'chai';
import chaiHttp from 'chai-http';
import { exec } from 'child_process';
import server from '../app';
import loans from '../models/loans';

chai.use(chaiHttp);

const { expect } = chai;

describe('possible loan routes', () => {
  before((done) => {
    const dump = 'psql -h localhost -d testdb -U postgres -f server/test/testdb.sql';
    exec(dump, (err) => {
      done();
    });
  });
  describe('POST loan application /api/v1/loans', () => {
    it('should return loan application successful', (done) => {
      chai.request(server)
        .post('/api/v1/loans')
        .set('Accept', 'application/json')
        .send(loans[0])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(201);
          expect(res.body.data.firstName).to.equal('ejike');
          expect(res.body.data.lastName).to.equal('igboko');
          expect(res.body.data.email).to.equal('ejike112@yahoo.com');
          expect(res.body.data.tenor).to.equal('6');
          expect(res.body.data.amount).to.equal(50000);
          expect(res.body.data.interest).to.equal(2500);
          expect(res.body.data.paymentInstallment).to.equal(8750);
          expect(res.body.data.createdOn).to.equal('2019-05-23T08:30:09.616Z');
          done();
        });
    });
  });

  describe('POST should return loan application details incomplete /api/v1/loans', () => {
    it('should return error when application details is incomplete', (done) => {
      chai.request(server)
        .post('/api/v1/loans')
        .set('Accept', 'application/json')
        .send(loans[1])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });

  describe('User GET loan repayment history /api/v1/loans/:loan-id/repayments', () => {
    it('should return your repayment history', (done) => {
      chai.request(server)
        .get('/api/v1/loans/2/repayments')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.data.loanid).to.equal(2);
          expect(res.body.data.createdon).to.equal("2019-05-23T17:43:16.105Z");
          expect(res.body.data.paymentinstallment).to.equal(15750);
          expect(res.body.data.amount).to.equal(60000);
          expect(res.body.data.balance).to.equal(15750);
          done();
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
          expect(res.status).to.equal(200);
          expect(res.body.data.firstname).to.equal('ejike');
          expect(res.body.data.lastname).to.equal('igboko');
          expect(res.body.data.email).to.equal('ejike112@yahoo.com');
          expect(res.body.data.tenor).to.equal('4');
          expect(res.body.data.amount).to.equal(60000);
          expect(res.body.data.status).to.equal('approved');
          expect(res.body.data.paymentinstallment).to.equal(15750);
          expect(res.body.data.repaid).to.equal(true);
          expect(res.body.data.createdon).to.equal("2019-05-23T16:00:59.611Z");
          done();
        });
    });
  });

  describe('GET all repaid loan application /api/v1/loans?status=approved&repaid=true', () => {
    it('should return all repaid loans', (done) => {
      chai.request(server)
        .get('/api/v1/loans?status=approved&repaid=true')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.data.firstname).to.equal('ejike');
          expect(res.body.data.lastname).to.equal('igboko');
          expect(res.body.data.email).to.equal('ejike112@yahoo.com');
          expect(res.body.data.tenor).to.equal('4');
          expect(res.body.data.amount).to.equal(60000);
          expect(res.body.data.status).to.equal('approved');
          expect(res.body.data.paymentinstallment).to.equal(15750);
          expect(res.body.data.repaid).to.equal(true);
          expect(res.body.data.createdon).to.equal("2019-05-23T16:00:59.611Z");
          done();
        });
    });
  });

  describe('GET all current loan application /api/v1/loans?status=approved&repaid=false', () => {
    it('should return All loans not fully repaid', (done) => {
      chai.request(server)
        .get('/api/v1/loans?status=approved&repaid=false')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.data.firstname).to.equal('ejike');
          expect(res.body.data.lastname).to.equal('igboko');
          expect(res.body.data.email).to.equal('ejike112@yahoo.com');
          expect(res.body.data.tenor).to.equal('4');
          expect(res.body.data.amount).to.equal(60000);
          expect(res.body.data.status).to.equal('approved');
          expect(res.body.data.paymentinstallment).to.equal(15750);
          expect(res.body.data.repaid).to.equal(true);
          expect(res.body.data.createdon).to.equal("2019-05-23T16:00:59.611Z");
          done();
        });
    });
  });

  describe('GET a specific loan application /api/v1/loans/:loan-id', () => {
    it('should return a specific loan application fetched', (done) => {
      chai.request(server)
        .get('/api/v1/loans/2')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.data.firstname).to.equal('Ade');
          expect(res.body.data.lastname).to.equal('Adeja');
          expect(res.body.data.email).to.equal('boths1040@yahoo.com');
          expect(res.body.data.tenor).to.equal('4');
          expect(res.body.data.amount).to.equal(60000);
          expect(res.body.data.status).to.equal('approved');
          expect(res.body.data.repaid).to.equal(false);
          expect(res.body.data.paymentinstallment).to.equal(15750);
          expect(res.body.data.createdon).to.equal("2019-05-23T17:43:16.105Z");
          done();
        });
    });
  });

  describe('GET a specific loan application with a wrong ID /api/v1/loans/:loan-id', () => {
    it('should return loanID error', (done) => {
      chai.request(server)
        .get('/api/v1/loans/00')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(500);
          expect(res.body.message).to.equal('server error');
          done();
        });
    });
  });

  describe('PATCH Approve/Reject loan application /api/v1/loans/:loan-id', () => {
    it('should return loan application approved', (done) => {
      chai.request(server)
        .patch('/api/v1/loans/1')
        .set('Accept', 'application/json')
        .send({
          status: 'approved',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.data.tenor).to.equal('4');
          expect(res.body.data.amount).to.equal(60000);
          expect(res.body.data.status).to.equal('approved');
          expect(res.body.data.paymentInstallment).to.equal(15750);
          expect(res.body.data.interest).to.equal(3000);
          expect(res.body.data.createdOn).to.equal("2019-05-23T16:00:59.611Z");
          done();
        });
    });
  });

  describe('POST /loans repayment record /api/v1/loans/:loan-id/repayments', () => {
    it('should return client loan payment posting successful', (done) => {
      chai.request(server)
        .post('/api/v1/loans/2/repayments')
        .set('Accept', 'application/json')
        .send({
          paidAmount: 15750
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(200);
          expect(res.body.data.loanid).to.be.equal(2);
          expect(res.body.data.createdon).to.be.equal("2019-05-23T18:12:25.365Z");
          expect(res.body.data.amount).to.be.equal(60000);
          expect(res.body.data.monthlyinstallment).to.be.equal(15750);
          expect(res.body.data.paidamount).to.be.equal(15750);
          expect(res.body.data.balance).to.be.equal(47250);
          expect(res.body.data.status).to.be.equal('approved');
          expect(res.body.data.repaid).to.be.equal(false);
          done();
        });
    });
  });
});

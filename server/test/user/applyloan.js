import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
chai.use(chaiHttp);

const { expect } = chai;

describe('Apply Loan Routes /api/v1/loan/applyloan', () => {
  it('should return loan application successful', (done) => {
    chai.request(server)
      .post('/api/v1/loan/applyloan')
      .set('Accept', 'application/json')
      .send({
        name: 'Chukwuma Emmanuel',
        home_address: '17 broad street',
        current_loan: 'false',
        loan_amount: '30000',
        loan_duration: '3 months',
        employment_status: 'employed',
        name_organisation: 'boths integrated',
        address_organisation: '231 ade street',
        bank_details: {
          fullname: 'chukwuma',
          bank_name: 'gtbank',
          account_number: '12345679878'
        }
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('loan application successful');
        setImmediate(done);
      });
  });
  it('should return error when application details is incomplete', (done) => {
    chai.request(server)
      .post('/api/v1/loan/applyloan')
      .set('Accept', 'application/json')
      .send({
        name: '',
        home_address: '',
        current_loan: 'false',
        loan_amount: '30000',
        loan_duration: '3 months',
        employment_status: 'employed',
        name_organisation: '',
        address_organisation: '231 ade street',
        bank_details: {
          name: 'chukwuma',
          bank_name: 'gtbank',
          account_number: ''
        }
      })
      .end((err, res) => {
        const {
          name, home_address, name_organisation, 'bank_details.account_number': account_number
        } = res.body.errors;
        console.log('bank_details', res.body.errors);
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(name[0]).to.equal('the name is required');
        expect(name_organisation[0]).to.equal('the name organisation is required');
        expect(account_number[0]).to.equal('the bank details.account number is required')
        setImmediate(done);
      });
  });
  it('should return loan application unsuccessful', (done) => {
    chai.request(server)
      .post('/api/v1/loan/applyloan')
      .set('Accept', 'application/json')
      .send({
        name: 'Chukwuma Emmanuel',
        home_address: '17 broad street',
        current_loan: 'true',
        loan_amount: '30000',
        loan_duration: '3 months',
        employment_status: 'employed',
        name_organisation: 'boths integrated',
        address_organisation: '231 ade street',
        bank_details: {
          name: 'chukwuma',
          bank_name: 'gtbank',
          account_number: '1234567676554'
        }
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('loan application unsuccessful');
        setImmediate(done);
      });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

describe('Catch all routes', () => {
  describe('Request non-existing route', () => {
    it('should return welcome to default routes', (done) => {
      chai.request(server)
        .get('/')
        .set('Accept', 'application/json')
        .end((err, res) => {
          chai.expect(res.body).to.be.an('object');
          chai.expect(res.statusCode).to.equal(200);
          setImmediate(done);
        });
    });
  });
});

import chai from 'chai';
import server from '../app';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

describe('Catch all routes', function() {
  describe('Request non-existing route', function() {
    it('should return welcome to default routes', function(done) {
      chai.request(server)
          .get('/')
          .set('Accept', 'application/json')
          .end((err, res) => {
            chai.expect(res.body).to.be.an('object')
            chai.expect(res.statusCode).to.equal(200)
            setImmediate(done)
          })
    });
  });
});

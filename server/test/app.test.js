const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('app', () => {
  describe('/api-docs.json', () => {
    it('responds with swagger doc', () =>
      chai
        .request(app)
        .get('/api-docs.json')
        .then(function(res) {
          expect(res).to.have.status(200);
        })
        .catch(function(err) {
          throw err;
        }));
  });

  describe('404', () => {
    it('responds with 404 unless route exists', () =>
      chai
        .request(app)
        .get('/404')
        .then(function(res) {
          expect(res).to.have.status(404);
        })
        .catch(function(err) {
          throw err;
        }));
  });
});

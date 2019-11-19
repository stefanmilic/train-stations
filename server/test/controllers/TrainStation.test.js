const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const stationApi = require('../../lib/train-stations/api/station');
const { mockQuery, mockConnection } = require('../mocks/connection');

chai.use(chaiHttp);

describe('TrainStationController', () => {
  describe('.getTrainStationsData', () => {
    let stub;
    beforeEach(() => {
      stub = sinon.stub(stationApi, 'getTrainStationsData');
    });
    afterEach(() => {
      stub.restore();
    });
    it('responds with 200', () => {
      const connectionMock = mockConnection();

      stub.resolves(connectionMock);
      chai
        .request(app)
        .get('/destination')
        .query(mockQuery())
        .then(function(res) {
          chai.expect(res).to.have.status(200);
          chai.assert.deepEqual(res.body, connectionMock);
        })
        .catch(function(err) {
          throw err;
        });
    });

    it('responds with 400', () => {
      const errorMock = { error: 'Generic error occured!' };
      stub.rejects(errorMock);

      chai
        .request(app)
        .get('/destination')
        .query(mockQuery())
        .end(function(err, res) {
          chai.expect(res).to.have.status(400);
          chai.assert.deepEqual(res.body, errorMock);
        });
    });
  });
});

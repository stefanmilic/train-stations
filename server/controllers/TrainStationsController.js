const joi = require('joi');
const { validate } = require('../utils/validationHelper');
const stationApi = require('../lib/train-stations/api/station');
const { Connection } = require('../models/Connection');
const { counter, histogram, summary } = require('../metrics');

class TrainStationController {
  /**
   * @route GET /destination
   * @produces application/json
   * @param {string} from.query.required - Departure station
   * @param {string} to.query.required - Arrival station
   * @param {string} time.query - Arrival time - eg: 17:30
   * @param {string} date.query - Arrival date - eg: 2019-11-15
   * @returns {Connection.model} 200 - An array of connections
   */

  static getTrainStationsData(req, res) {
    const end = histogram.startTimer({
      route: req.route.path,
      method: req.method,
    });
    const endSum = summary.startTimer({
      route: req.route.path,
      method: req.method,
    });
    // count number of requests
    counter.inc();

    const schema = joi.object().keys({
      from: joi.string().required(),
      to: joi.string().required(),
      time: joi.string(),
      date: joi.string(),
    });
    const { from, to, time, date } = validate(req.query, schema);

    stationApi
      .getTrainStationsData({ from, to, time, date })
      .then(connections => Connection.fromJSON(connections[0]))
      .then(data => {
        res.json(data);
        end({ statusCode: '200' });
        endSum();
      })
      .catch(err => {
        res.status(err.status || 400).json(err);
        end({ statusCode: err.status });
      });
  }
}

module.exports = TrainStationController;

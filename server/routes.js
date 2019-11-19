const routes = require('express').Router();
const TrainStationsController = require('./controllers/TrainStationsController');

routes.get('/destination', TrainStationsController.getTrainStationsData);

module.exports = routes;

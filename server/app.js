const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const swagger = require('express-swagger-generator');
const client = require('prom-client');

const app = express();
dotenv.config();
dotenv.config({ path: `.env.${app.get('env')}` });
const expressswagger = swagger(app);

// swagger is visible on http://localhost:4000/api-docs/
expressswagger({
  swaggerDefinition: {
    info: {
      description: ' train station api',
      title: 'Train stations API',
      version: '1.0.0',
    },
    host: process.env.HOST,
    produces: ['application/json'],
    schemes: ['http', 'https'],
  },
  basedir: __dirname, // app absolute path
  files: ['./models/**/*.js', './controllers/**/*.js'], // Path to the API handle folder
});

const routes = require('./routes');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(expressswagger);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  next(err);
});

module.exports = app;

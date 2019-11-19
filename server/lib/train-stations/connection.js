const axios = require('axios');
const errorParser = require('./errorParser');

/** @type {import('axios').AxiosStatic} */
const connection = axios.create({
  baseURL: process.env.TRANSPORT_URL,
});

connection.interceptors.response.use(undefined, err =>
  Promise.reject(errorParser(err.response ? err.response.data : {})),
);

module.exports = connection;

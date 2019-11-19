const faker = require('faker');
const mockSection = require('./section');
const { mockArray } = require('./journey');

const mockConnection = () => ({
  sections: mockArray(mockSection)(1),
  duration: {
    day: '',
    hours: '',
    minutes: '57m',
    seconds: '',
  },
  transfers: faker.random.number(),
});

const mockQuery = () => ({
  from: 'bern',
  to: 'zerich',
  time: '17:30',
  date: '2019-12-12',
});

module.exports = { mockConnection, mockQuery };

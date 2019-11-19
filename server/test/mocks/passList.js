const faker = require('faker');
const mockStation = require('./station');

const mockPassList = () => ({
  departure: faker.date.past().getTime(),
  arrival: faker.date.future().getTime(),
  platform: faker.random.number(),
  station: mockStation(),
});

module.exports = mockPassList;

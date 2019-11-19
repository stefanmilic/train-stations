const faker = require('faker');
const mockPassList = require('./passList');

const mockArray = fn => length => Array.from({ length }).map(fn);

const mockJourney = () => ({
  name: faker.random.word(),
  transportType: faker.random.word(),
  number: faker.random.number(),
  category: faker.random.word(),
  operator: faker.random.word(),
  passList: mockArray(mockPassList)(1),
  to: faker.random.word(),
});

module.exports = {
  mockArray,
  mockJourney,
};

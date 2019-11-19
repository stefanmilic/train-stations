const faker = require('faker');

const mockStation = () => ({
  id: faker.random.word(),
  name: faker.random.word(),
  score: null,
  distance: null,
  coordinate: {
    type: faker.random.word(),
    x: faker.random.number(),
    y: faker.random.number(),
  },
});

module.exports = mockStation;

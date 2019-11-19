const faker = require('faker');
const { mockJourney } = require('./journey');
const mockStation = require('./station');

const mockArrivalAndDeparture = () => ({
  departure: faker.date.past().getTime(),
  arrival: faker.date.future().getTime(),
  station: mockStation(),
});

const mockSection = () => ({
  arrival: mockArrivalAndDeparture(),
  departure: mockArrivalAndDeparture(),
  journey: mockJourney(),
  walk: {
    duration: faker.random.number(),
  },
});

module.exports = mockSection;

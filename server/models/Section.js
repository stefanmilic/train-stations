const Journey = require('./Journey');
/**
 * @typedef StationInfo
 * @property {string} arrival
 * @property {string} departure
 * @property {Station.model} station
 */

class StationInfo {
  /**
   * @param {StationInfo} param0
   */
  constructor({ arrival, departure, station }) {
    this.arrival = arrival;
    this.departure = departure;
    this.station = station;
  }
  /**
   * @param {StationInfo} params
   */
  static mapStation(params) {
    return new StationInfo(params);
  }
}
/**
 * @typedef Walk
 * @property {number} duration
 */

/**
 * @typedef Section
 * @property {StationInfo.model} arrival
 * @property {StationInfo.model} departure
 * @property {Journey.model} journey
 * @property {Walk.model} walk
 */

class Section {
  /**
   *
   * @param {Section} param0
   */
  constructor({ arrival, departure, journey, walk }) {
    this.arrival = arrival;
    this.departure = departure;
    this.journey = journey;
    this.walk = walk;
  }

  /**
   *
   * @param {Section} param0
   */
  static mapSection({ journey, arrival, departure, ...rest }) {
    return new Section({
      journey: journey && Journey.mapJourney(journey),
      arrival: arrival && StationInfo.mapStation(arrival),
      departure: departure && StationInfo.mapStation(departure),
      ...rest,
    });
  }
}

module.exports = Section;

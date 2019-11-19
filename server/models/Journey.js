/**
 * @typedef Coordinate
 * @property {string} type
 * @property {number} x
 * @property {string} y
 */

/**
 * @typedef Station
 * @property {Coordinate.model} coordinate
 * @property {string} id
 * @property {string} name
 * @property {number} score
 */

/**
 * @typedef PassList
 * @property {string} arrival
 * @property {string} departure
 * @property {string} platform
 * @property {Station.model} station
 */

class PassList {
  /**
   *
   * @param {PassList} param0
   */
  constructor({ arrival, departure, platform, station }) {
    this.arrival = arrival;
    this.departure = departure;
    this.platform = platform;
    this.station = station;
  }

  /**
   * @param {PassList} params
   */
  static mapPassList(params) {
    return new PassList(params);
  }
}

/**
 * @typedef Journey
 * @property {string} name
 * @property {string} transportType
 * @property {number} number
 * @property {string} category
 * @property {string} operator
 * @property {PassList.model} passList
 * @property {string} to
 */

class Journey {
  /**
   * @param {Journey} param0
   */
  constructor({
    name,
    number,
    category,
    transportType,
    operator,
    passList,
    to,
  }) {
    this.name = name;
    this.transportType = transportType;
    this.number = number;
    this.category = category;
    this.operator = operator;
    this.passList = passList;
    this.to = to;
  }

  /**
   * @param {Journey} params
   */
  static mapJourney({ passList, category, ...rest }) {
    const transportType = category.includes('T')
      ? 'tram'
      : category.match(/^(NFB|NFO)$/)
      ? 'bus'
      : 'train';

    return new Journey({
      passList: passList.map(list => PassList.mapPassList(list)),
      category,
      transportType,
      ...rest,
    });
  }
}

module.exports = Journey;

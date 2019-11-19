const Section = require('./Section');
const { mapDuration } = require('../utils/functions');

/**
 * @typedef Connection
 * @property {Section.model} sections
 * @property {string} duration
 * @property {string} transfers
 */

class Connection {
  /**
   *
   * @param {Connection} param0
   */
  constructor({ duration, sections, transfers }) {
    this.sections = sections;
    this.duration = duration;
    this.transfers = transfers;
  }

  /**
   * @param {Connection} params
   */
  static fromJSON({ sections, duration, ...rest }) {
    return new Connection({
      sections: sections.map(section => Section.mapSection(section)),
      duration: mapDuration(duration),
      ...rest,
    });
  }
}

module.exports = {
  Connection,
};

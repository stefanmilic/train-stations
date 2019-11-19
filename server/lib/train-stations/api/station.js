const connection = require('../connection');

module.exports = {
  /**
   *
   * @param {{from: string, to: string, time:string,date:string}} param
   */
  getTrainStationsData({ from, to, time, date }) {
    return connection
      .get('/connections', {
        params: {
          from,
          to,
          isArrivalTime: 1,
          time,
          date,
          limit: 1,
        },
      })
      .then(({ data }) => data.connections);
  },
};

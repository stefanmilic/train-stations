const client = require('prom-client');
// To register metrics to another registry, pass it in as register:
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

module.exports = {
  // Counters go up, and reset when the process restarts.
  counter: new client.Counter({
    name: 'node_request_operations_total',
    help: 'The total number of processed requests',
  }),
  // Histograms track sizes and frequency of events.
  histogram: new client.Histogram({
    name: 'node_request_duration_seconds',
    help: 'Histogram for the duration in seconds.',
    labelNames: ['route', 'method', 'statusCode'],
    buckets: [1, 2, 5, 6, 10],
  }),
  // Summaries calculate percentiles of observed values.
  summary: new client.Summary({
    name: 'node_request_summary_duration_percent',
    help: 'Summary for the duration in seconds.',
    percentiles: [0.01, 0.1, 0.9, 0.99],
  }),
};

// next move would be connection with Prometheus and Grafana :)

const path = require('path');
const paths = require('./paths');

module.exports = {
  'src': paths.appSrc,
  '@components': path.join(paths.appSrc, 'components'),
  '@styles': path.join(paths.appSrc, 'assets/styles'),
  '@images': path.join(paths.appSrc, 'assets/images'),
};

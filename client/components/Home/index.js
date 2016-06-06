if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  module.exports = require('./Home.prod.js');
} else {
  // eslint-disable-next-line global-require
  module.exports = require('./Home.dev.js');
}

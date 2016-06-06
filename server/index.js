// Allow ES6 on the server-side.
require('babel-core/register');

// require('./initialize');

// Boot up the server that corresponds to the environment.
var fileName = './server.' + process.env.NODE_ENV; // eg. ./server.development

require(fileName);

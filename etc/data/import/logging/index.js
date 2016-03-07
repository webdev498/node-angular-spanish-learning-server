var inspect = require('util').inspect;

function toLogStatement(level, args) {
  var statement = Array.prototype.slice.call(args).map(inspect);
  statement.unshift(level.toUpperCase(), new Date());
  return statement;
}

function error() {
  return console.error.apply(console, toLogStatement('error', arguments));
}

function debug() {
  return console.log.apply(console, toLogStatement('debug', arguments));
}

function info() {
  return console.info.apply(console, toLogStatement('info', arguments));
}


module.exports = {
  error: error,
  debug: debug,
  info: info
};

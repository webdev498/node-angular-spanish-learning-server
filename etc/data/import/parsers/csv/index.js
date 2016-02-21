var parse = require('fast-csv');
var EventEmitter = require('events');

module.exports = function parseCSV(options) {
  var emitter = new EventEmitter();
  var buffer = [];

  parse.fromPath(options.path, {headers: options.headers})
  .on('data', function(data) {
    buffer.push(data);
    emitter.emit('row', data);
  })
  .on('end', function () {
    emitter.emit('done', buffer);
  });

  return emitter;
};

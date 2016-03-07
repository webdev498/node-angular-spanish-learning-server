'use strict';
var parser = require('minimist');
var validate = require('./validations');


module.exports = function parseArgs(argv) {
  var parsed = parser(argv.slice(2));
  var path = parsed._[0];
  
  return validate({
    path: path,
    mediaType: path ? path.split('.')[1] : null,
    drop: !!parsed.D || !!parsed.drop,
    type: parsed.T || parsed.type,
    headers: parsed.H || parsed.headers
  });
};

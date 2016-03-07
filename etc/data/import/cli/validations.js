var supportedTypes = ['choice', 'category'];
var supportedMedia = ['csv'];

var strategies = [
  function validatesPath(options) {
    if (!options.path || typeof options.path !== 'string') {
      throw new Error("A path to file to be parsed is required");
    }
  },

  function validatesMediaType(options) {
    if (!options.mediaType) {
      throw new Error('Path must point to a file, not a directory');
    } else if (supportedMedia.indexOf(options.mediaType) > -1 !== true) {
      throw new Error(options.mediaType + ' is not a supported media type.');
    }
  },

  function validatesDataType(options) {
    if(supportedTypes.indexOf(options.type) > -1 !== true) {
      throw new Error(options.type + ' is not a supported data type');
    }
  }
];

module.exports = function validate(options) {
  strategies.forEach(function(strategy){ strategy(options); });
  return options;
};

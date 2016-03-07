require('babel/polyfill');
var models = require('./../../../../../dist/choices/models');

var Category = models.Category;

module.exports = function (row) {

  return new Promise(function(resolve, reject){
      return Category.forge({
        name: row.categories
      }).save()
        .then(resolve)
        .catch(reject);
  });
};

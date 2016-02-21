require('babel/polyfill');

// TODO: Don't couple though location on the file system.
// Need to find a better way to share entities in the long-term
var models = require('./../../../../../dist/choices/models');

var Choice = models.Choice;
var Category = models.Category;

module.exports = function (row) {
    return new Promise(function(resolve, reject) {

      var choice = Choice.forge({
        text: row.text.trim(),
        translation: row.translation
      });

      var category = Category.forge({
        name: row.categories
      });

      category.fetch({require: true}).then(function(savedCategory) {
        choice.set('category_id', savedCategory.get('id'));

        return choice.save().then(function(savedChoice) {
          resolve(savedCategory, savedChoice);
        }).catch(reject);

      }).catch(function() { // We don't exist

        return category.save().then(function(savedCategory) {
          choice.set('category_id', savedCategory.get('id'));

          return choice.save().then(function(savedChoice) {
            resolve(savedCategory, savedChoice);
          }).catch(reject);
        });

      });
    });
  };

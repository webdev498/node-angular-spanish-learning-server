/* @flow */

import Orm from 'data/orm';
import Base from 'models/Base';
import 'languages/models/Language';

const tableName = 'terms';
const persistenceWhitelist = [
  'value', 'lexicalCategory', 'languageId',
  'active', 'created_at', 'updated_at'
];

const Term = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  language () {
    return this.belongsTo('Language');
  },

  categories () {
    return this.belongsToMany('Category');
  },

  serialize() {
    const { id, value, lexicalCategory, active, language, createdAt, updatedAt } = this.attributes;
    const { relations } = this;
    return {
      id,
      value,
      lexicalCategory,
      active,
      language,
      relations,
      createdAt,
      updatedAt
    };
  },

  validate() {}
});

export default Orm.model('Term', Term);

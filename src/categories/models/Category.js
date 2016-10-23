import Orm from 'data/orm';
import { Name } from './../validations';
import Base from 'models/Base';

const tableName = 'categories';
const persistenceWhitelist = ['name', 'active'];
const versionableAttributes = ['id', 'name'];

const Category = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist, versionableAttributes });
  },

  terms() {
    this.belongsToMany('Term');
  },

  serialize() {
    const { id, name, createdAt, updatedAt } = this.attributes;

    return {
      id,
      name,
      createdAt,
      updatedAt
    };
  },

  validate() {
    [Name].forEach((validate) => { validate(this.attributes); });
  }

});

export default Orm.model('Category', Category);

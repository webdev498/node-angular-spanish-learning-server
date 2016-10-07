import Orm from '../../data/orm';
import { Name } from './../validations';
import Base from './../../common/models/Base';

const tableName = 'categories';
const persistenceWhitelist = ['name', 'active'];
const versionableAttributes = ['id', 'name'];

const Category = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist, versionableAttributes });
  },

  serialize() {
    const { id, name, parentId, createdAt, updatedAt } = this.attributes;

    return {
      id,
      name,
      parentId,
      createdAt,
      updatedAt
    };
  },

  validate() {
    [Name].forEach((validate) => { validate(this.attributes); });
  }

});

export default Orm.model('Category', Category);

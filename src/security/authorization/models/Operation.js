//@flow
import Orm from 'data/orm';
import Base from 'models/Base';
import 'security/authorization/models/Permission';

const tableName = 'operations';
const persistenceWhitelist = ['id', 'name'];

const Operation = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  permissions() {
    return this.hasMany('Permission');
  },

  // defines an object that will be serialized to JSON when JSON.stringify is called
  serialize() {
    const { id, name, createdAt, updatedAt } = this.attributes;
    const { relations } = this;

    return {
      id,
      name,
      relations,
      createdAt,
      updatedAt
    };
  }
});

export default Orm.model('Operation', Operation);

import Orm from 'data/orm';
import Base from 'models/Base';
import 'models/Permission';

const tableName = 'resources';
const persistenceWhitelist = ['id', 'name'];

const Resource = Base.extend({
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

export default Orm.model('Resource', Resource);

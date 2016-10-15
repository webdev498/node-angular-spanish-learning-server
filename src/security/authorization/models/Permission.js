//@flow
import Orm from 'data/orm';
import Base from 'models/Base';
import 'security/authorization/models/Role';
import 'security/authorization/models/Operation';
import 'security/authorization/models/Resource';

const tableName = 'permissions';
const persistenceWhitelist = ['id', 'operation_id', 'resource_id'];

const Permission = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  roles() {
    return this.belongsToMany('Role');
  },

  operation() {
    return this.belongsTo('Operation');
  },

  resource() {
    return this.belongsTo('Resource');
  },

  // defines an object that will be serialized to JSON when JSON.stringify is called
  serialize() {
    const { id, createdAt, updatedAt } = this.attributes;
    const { relations } = this;

    return {
      id,
      relations,
      createdAt,
      updatedAt
    };
  }

});

export default Orm.model('Permission', Permission);

import Orm from 'data/orm';
import Base from 'models/Base';
import Permission from 'security/authorization/models/Permission';
import User from 'users/models/User';

const tableName = 'roles';
const persistenceWhitelist = ['id', 'name'];

const Role = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  permissions() {
    return this.belongsToMany(Permission);
  },

  users() {
    return this.hasMany(User);
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

export default Orm.model('Role', Role);

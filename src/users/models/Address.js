import Orm from '../../data/orm';
import Base from './../../common/models/Base';
import User from './User';



const tableName = 'addresses';
const persistenceWhitelist = ['street', 'city', 'state', 'postalCode', 'userId'];

const Address = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  getForeignKeys() {
    return ['user_id'];
  },

  user() {
    return this.belongsTo(User);
  },

  serialize() {
    const { id, street, city, state, postalCode, type } = this.attributes;

    return {
      id,
      street,
      city,
      state,
      postalCode,
      type
    };
  },

  validate() {}
});

export default Orm.model('Address', Address);

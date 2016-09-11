import Orm from 'data/orm';
import Base from 'models/Base';
import User from 'users/models/User';



const tableName = 'nationalities';
const persistenceWhitelist = ['name'];

const Nationality = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  user() {
    return this.hasMany(User);
  },

  serialize() {
    const { id, name } = this.attributes;

    return {
      id,
      name
    };
  },

  validate() {}
});

export default Orm.model('Nationality', Nationality);

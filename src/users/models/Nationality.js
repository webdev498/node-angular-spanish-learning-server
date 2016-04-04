import { getORM } from '../../data/orm';
import Base from './../../common/models/Base';
import User from './User';

const Orm = getORM();

const tableName = 'nationalities';
const persistenceWhitelist = ['name'];

const Nationality = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  user() {
    return this.hasOne(User);
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

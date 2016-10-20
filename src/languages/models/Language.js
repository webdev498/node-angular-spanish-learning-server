/* @flow */

import Orm from 'data/orm';
import Base from 'models/Base';
import 'terminology/models/Term';

const tableName = 'languages';
const persistenceWhitelist = ['name', 'updated_at'];

const Language = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  terms() {
    return this.hasMany('Term');
  },

  serialize() {
    const { id, name, active, createdAt, updatedAt } = this.attributes;
    const { relations } = this;
    return {
      id,
      name,
      active,
      relations,
      createdAt,
      updatedAt
    };
  },

  validate() {}

});

export default Orm.model('Language', Language);

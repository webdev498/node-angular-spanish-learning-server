/* @flow */

import Orm from '../../data/orm';
import Base from './../../common/models/Base';

const tableName = 'term_exclusions';
const persistenceWhitelist = [
  'name',
  'active',
  'languageId',
  'sourceId',
  'targetId',
  'updatedAt'
];

const TermExclusion = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  language() {
    this.belongsTo('Language');
  },

  source() {
    this.belongsTo('Term');
  },

  target() {
    this.belongsTo('Term');
  },

  serialize() {
    const { id, active, createdAt, updatedAt } = this.attributes;
    const { relations } = this;
    return {
      id,
      active,
      relations,
      createdAt,
      updatedAt
    };
  },

  validate() {}

});

export default Orm.model('TermExclusion', TermExclusion);

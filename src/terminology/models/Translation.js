  /* @flow */
import Orm from 'data/orm';
import Base from 'models/Base';
import 'terminology/models/Term';

const tableName = 'translations';
const persistenceWhitelist = ['source', 'target', 'mode'];

type TranslationAttributes = {
  id: string;
  source: string;
  target: string;
};

const Translation = Base.extend({
  tableName,

  initialize(attributes: TranslationAttributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  source() {
    return this.belongsTo('Term', 'source');
  },

  target() {
    return this.belongsTo('Term', 'target');
  },

  serialize() {
    const { id, source, target, mode, createdAt, updatedAt } = this.attributes;
    const { relations } = this;
    return {
      id,
      source,
      target,
      mode,
      relations,
      createdAt,
      updatedAt
    };
  },
  validate() {}
}, {
  random(limit: number = 30) {
    return Translation.query((queryBuilder) => {
      queryBuilder
        .select()
        .orderByRaw('random()')
        .limit(limit);
      }).fetchAll({withRelated: ['source', 'target']});

  },
    random_target_source(limit: number = 30) {
    return Translation.query((queryBuilder) => {
      queryBuilder
        .select()
        .orderByRaw('random()')
        .limit(limit);
      }).fetchAll({withRelated: ['target', 'source']});

  }
});

export default Orm.model('Translation', Translation);

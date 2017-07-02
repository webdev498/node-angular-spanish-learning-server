  /* @flow */
import Orm from 'data/orm';
import Base from 'models/Base';
import 'terminology/models/Term';
import type { Category } from 'categories/models/Category';

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
  randomByCategory(limit: number = 30, category: Category) {
    return Translation.query((queryBuilder) => {
      queryBuilder
        .join('terms', 'translations.source', 'terms.id')
        .join('categories_terms', 'terms.id', 'categories_terms.term_id')
        .distinct('translations.source', 'translations.target', 'translations.id')
        .where('categories_terms.category_id', '=', category.get('id'))
        .limit(limit);
    }).fetchAll({withRelated: ['source', 'target']});
  }
});

export default Orm.model('Translation', Translation);

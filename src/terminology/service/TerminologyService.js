/* @flow */
import TermExclusion from 'terminology/models/TermExclusion';
import Term from 'terminology/models/Term';

export default class TerminologyService {
  async exclude(sourceId: string, languageId: string, targets: Array<Term>) {
    const deferred = targets.map((target) => {
      return TermExclusion.forge({
        languageId,
        sourceId,
        targetId: target.id
      }).save();
    });
    return Promise.all(deferred);
  }
  
  async list({ languageName, categories, count, includeTranslations }: Object) {
    const withRelated = ['language', 'categories'];
    count = Number(count);

    if (includeTranslations && languageName) {
      withRelated.push(languageName.toLowerCase() === 'spanish' ? 'englishTranslations' : 'spanishTranslations');
    }

    return await Term.query((query) => {

        if (categories) {
          query.join('categories_terms', 'terms.id', 'categories_terms.term_id');
          query.join('categories', 'categories_terms.category_id', 'categories.id');
          query.where('categories.id', 'in', categories);
        }

        if (languageName) {
          query.innerJoin('languages', 'terms.language_id', 'languages.id');
          query.where('languages.name', '=', languageName);
        }

        if (count && !isNaN(count)) {
          query.limit(count);
        }

        query.orderBy('terms.value', 'ASC');
      }).fetchAll({ withRelated });
  }

  async fetchTranslations(terms: BookshelfCollection) {
    const firstTerm = terms.head();
    const relationKeys = Object.keys(firstTerm.relations);
    const withRelated = relationKeys.filter(key => !key.includes('Translations'));
    const translationType = relationKeys.find(key => key.includes('Translations'));
    const language = firstTerm.relations.language.get('name');
    const foriegnKey = language === 'Spanish' ? 'source' : 'target';
    const ids = terms.models.reduce((collection, term) => {
      const keys = term.relations[translationType].map(translation => translation.get(foriegnKey));
      return collection.concat(keys);
    }, []);

    return await Term.where('id', 'in', ids).fetchAll({ withRelated });
  }

  async update({ id }: Object, {value, lexicalCategory, active}: Object) {
    return await Term.forge({id}).save({ value, lexicalCategory, active }, {patch: true});
  }

  async fetch({ id }: Object) {
    return Term.where({ id }).fetch();
  }

  async  findTranslations({ id, language }: Object) {
    language = language.toLowerCase();
    const joinClause = ['translations', 'terms.id', `translations.${language === 'spanish' ? 'target' : 'source'}`];
    const whereClause = [`translations.${language === 'spanish' ? 'source' : 'target'}`, '=', id];
    return await Term.query(builder => {
      builder.join(...joinClause);
      builder.where(...whereClause);
      builder.limit(1);
    }).fetchAll({ withRelated: ['categories']});
  }
}

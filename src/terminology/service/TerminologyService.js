// @flow
import TermExclusion from 'terminology/models/TermExclusion';
import Term from 'terminology/models/Term';

type TerminologyRequestQuery = {
  categories: Array<string>;
  withTranslations: boolean | string;
  associated: Array<string>;
  order: string;
  count: ?string | ?number;
};

type TerminologyRequestParameters = {
  language: string;
};

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

  async list({ params, query }: { params: TerminologyRequestParameters; query: TerminologyRequestQuery }) {
    const { language } = params;
    const { categories, withTranslations, associated, order }: TerminologyRequestQuery = query;
    const withRelated = associated || [];

    const count = Number(query.count);

    if (withTranslations && language) {
      if (!withRelated.includes('language')) {
        withRelated.push('language');
      }

      withRelated.push(language.toLowerCase() === 'spanish' ? 'englishTranslations' : 'spanishTranslations');
    }

    const terms: BookshelfCollection =  await Term.query((query) => {

      if (categories) {
        query.join('categories_terms', 'terms.id', 'categories_terms.term_id');
        query.join('categories', 'categories_terms.category_id', 'categories.id');
        query.where('categories.id', 'in', categories);
      }

      if (language) {
        query.innerJoin('languages', 'terms.language_id', 'languages.id');
        query.where('languages.name', '=', language);
      }

      if (count && !isNaN(count)) {
        query.limit(count);
      }

      if (order) {
        query.orderBy(...order.split(':'));
      }
    }).fetchAll({ withRelated });

    if (withTranslations) {
      const translatedTerms = await this.fetchTranslations(terms);
      const results = mapTranslationToTerm(terms, translatedTerms, language);
      return results;
    }

    return terms;

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


function mapTranslationToTerm(sourceTerms: BookshelfCollection, targetTerms: BookshelfCollection, languageName: string) {
  if (sourceTerms.isEmpty() || targetTerms.isEmpty()) {
    throw new Error('Either sourceTerms and targetTerms are empty and cannot be mapped');
  }

  const foreignKey = languageName === 'Spanish' ? 'source' : 'target';
  const firstTerm = sourceTerms.head();
  const translationType = Object.keys(firstTerm.relations).find(key => key.includes('Translations'));
  if (!translationType) {
    throw new Error('No translation associated with sourceTerms');
  }

  const results = sourceTerms.reduce((accumulator, source: BookshelfModel) => {
    let translations = source.related(translationType);
    if (translations == null) {
      throw new Error(`Missing ${translationType} from source term in translation`);
    } else if (typeof translations.pluck === 'function') {
      const keys = translations.pluck(foreignKey);
      targetTerms.each((target) => {
        if (keys.includes(target.get('id'))) {
          if (accumulator[source.get('id')]) {
            accumulator[source.get('id')].translations.push(target);
          } else {
            accumulator[source.get('id')] = { term: source, translations: [target] };
          }
        }
      });
    }

    return accumulator;
  }, {});

  const data =  Object.keys(results).map(key => {
    results[key].term.relations[translationType] = results[key].translations;
    return results[key].term;
  });
  return data;

}

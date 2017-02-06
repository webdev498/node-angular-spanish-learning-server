/* @flow */
import TermExclusion from 'terminology/models/TermExclusion';
import Term from 'terminology/models/Term';

export default class TerminologyService {
  constructor() {}

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

  async list({ languageName }: Object) {
    if (languageName) {
      return Term.query((qb) => {
        qb.innerJoin('languages', 'terms.language_id', 'languages.id');
        qb.where('languages.name', '=', languageName);
        qb.orderBy('terms.value', 'ASC');
      }).fetchAll({withRelated: ['language']});
    } else {
      return await Term.forge().orderBy('value', 'ASC').fetchAll({withRelated: ['language']});
    }
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
    }).fetchAll();
  }

}

/* @flow */
import TermExclusion from 'terminology/models/TermExclusion';
import Term from 'terminology/models/Term';
import Language from 'languages/models/Language';

type excludeParams = {
  language: Language;
  source: Term;
  targets: Array<Term>
};

export default class TerminologyService {
  constructor() {}

  async exclude({ language, source, targets }: excludeParams) {
    const deferred = targets.map((target) => {
      return TermExclusion.forge({
        languageId: language.id,
        sourceId: source.id,
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
}

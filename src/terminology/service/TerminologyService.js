/* @flow */
import CategoryService from 'categories/service';
import TermExclusion from 'terminology/models/TermExclusion';
import Term from 'terminology/models/Term';
import Translation from 'terminology/models/Translation';
import Language from 'languages/models/Language';

type excludeParams = {
  language: Language;
  source: Term;
  targets: Array<Term>
};

export default class TerminologyService {
  remainingCategories : any = null;

  constructor(categories: any) {
    this.remainingCategories = categories;
  }

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

  async update({ id }: Object, {value, lexicalCategory, active}: Object) {
    return await Term.forge({id}).save({ value, lexicalCategory, active }, {patch: true});
  }

  async fetch({ id }: Object) {
    return Term.where({ id }).fetch();
  }

  async findTranslations({ id, language }: Object) {
    language = language.toLowerCase();
    const joinClause = ['translations', 'terms.id', `translations.${language === 'spanish' ? 'target' : 'source'}`];
    const whereClause = [`translations.${language === 'spanish' ? 'source' : 'target'}`, '=', id];
    return await Term.query(builder => {
      builder.join(...joinClause);
      builder.where(...whereClause);
      builder.limit(1);
    }).fetchAll();
  }

  async categoryMatchingTerms(total: number) {
    let terms = [];
    
    let otherCategory = await CategoryService.other().first();
    const otherTerms = await Term.query((qb) => {
      qb.join('languages', 'terms.language_id', 'languages.id');
      qb.where('languages.name', '=', 'Spanish');
      qb.join('categories_terms', 'terms.id', 'categories_terms.term_id');
      qb.where('categories_terms.category_id', '=', otherCategory.get('id'));
      qb.orderByRaw('random()');
      qb.limit((number * 5) * .4);
    })
    .fetchAll({withRelated: ['categories']});

    terms.push(otherTerms);

    //remaining random categories
    for (let i = 0; i < this.remainingCategories.length; i++) {
      const remainingTerms = await Term.query((qb) => {
        qb.join('languages', 'terms.language_id', 'languages.id');
        qb.where('languages.name', '=', 'Spanish');
        qb.join('categories_terms', 'terms.id', 'categories_terms.term_id');
        qb.where('categories_terms.category_id', '=', remainingCategories[i].get('id'));
        qb.orderByRaw('random()');
        qb.limit((number * 5) * .2);
      })
      .fetchAll({withRelated: ['categories']});

      terms.push(remainingTerms);
    }

    return terms;
  }

  async translationsByCategoryCount(total: number) {
    let translations = [];
    //40% of questions to use 'Other' category.  Remaining 3 categories are random
    //translations by other category
    let otherCategory = await CategoryService.other().first();
    let otherTranslations = await Translation.randomByCategory(total * .4, 
      otherCategory.get('id'));
    otherTranslations = otherTranslations.serialize();
    translations.push(otherTranslations);

    //remaining random categories
    for (let i = 0; i < this.remainingCategories.length; i++) {
      let translationCategory = await Translation.randomByCategory(total * .2, 
      remainingCategories[i].get('id'));
      translationCategory = translationCategory.serialize();
      translations.push(translationCategory);
    }

    return translations;
  }
}

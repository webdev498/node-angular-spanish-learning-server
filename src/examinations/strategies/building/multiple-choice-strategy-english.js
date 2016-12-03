//@flow
import Term from 'terminology/models/Term';
import TermExclusion from 'terminology/models/TermExclusion';
import Translation from 'terminology/models/Translation';
import type { ExamSection } from 'examinations/templates/exam-template';
import * as UUID from 'javascript/datatypes/uuid';

function generatePseudoradomNumberBetween(start, end) {
  return Math.floor(Math.random() * end) + start;
}

const noneOfTheAbove = {
  id: '35fe100c-2e9b-42cf-bddc-a5ba3ad950ec',
  value: 'None of the above'
};

const questionOperations = [
  () => ({id: UUID.v4()}),
  ({ section }) => ({type: section.type}),
  ({ target }) => ({text: `What is the possible term for "${target.get('value')}" in English?`}),
  ({ source }) => ({correctResponses: [{id: source.get('id')}]}),
  ({ candidates }) => ({ terms: candidates.map(({id, value}) => ({ id, text: value }))})
];

function buildQuestion(params) {
  return questionOperations.reduce((question, operation) => {
    return Object.assign(question, operation(params));
  }, {});
}

export default async (section: ExamSection, type: string) => {
  const {id, instructions } = section;
  let translations = await Translation.random(section.itemCount(type));
  translations = translations.serialize();

  const questions = await Promise.all(translations.map(async ({source, relations}) => {
    const exclusions = await TermExclusion.where('source_id', '=', source).fetchAll();
    const categories = await relations.source.related('categories').fetch();
    const category = categories.first();
    const excludedIds = exclusions.pluck('targetId');

    const terms = await Term.query(builder => {
      if (excludedIds.length) {
        builder.where('id', 'not in', excludedIds);
      }
      builder.join('languages', 'terms.language_id', 'languages.id');
      builder.where('languages.name', '=', 'English');
      builder.join('categories_terms', 'terms.id', 'categories_terms.term_id');
      builder.where('categories_terms.category_id', '=', category.get('id'));
      builder.orderByRaw('random()');
      builder.limit(3);
    }).fetchAll();

    const candidates = terms.serialize().map(({id, value}) => ({id, value}));
    candidates.splice(generatePseudoradomNumberBetween(0, candidates.length), 0, {id: relations.source.get('id'), value: relations.source.get('value')});
    candidates.push(noneOfTheAbove);
    return buildQuestion({section, source: relations.source, target: relations.target, candidates});
  }));

  return { id, type: section.type, instructions, questions };
};

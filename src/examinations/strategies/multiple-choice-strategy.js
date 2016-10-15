//@flow
import Term from 'terminology/models/Term';
import TermExclusion from 'terminology/models/TermExclusion';
import Translation from 'terminology/models/Translation';
import type { ExamSection } from 'examinations/templates/exam-template';

import * as UUID from 'javascript/datatypes/uuid';
const questionOperations = [
  () => ({id: UUID.v4()}),
  ({ section }) => ({type: section.type}),
  ({ source }) => ({text: `What is the ${"Spanish"} term for ${source.get('value')}`}),
  ({ target }) => ({correctResponses: [{id: target.get('id')}]}),
  ({ candidates }) => ({ terms: candidates.map(({id, value}) => ({ id, text: value }))})
];

function buildQuestion(params) {
  return questionOperations.reduce((question, operation) => {
    return Object.assign(question, operation(params));
  }, {});
}

export default async (section: ExamSection) => {
  const {id, type, instructions } = section;
  let translations = await Translation.random(section.itemCount);
  translations = translations.serialize();
  const questions = await Promise.all(translations.map(async ({source, relations}) => {
    const exclusions = await TermExclusion.where('source_id', '=', source).fetchAll();
    const excludedIds = exclusions.pluck('targetId');
    const terms = await Term.query((qb) => {
      if (excludedIds.length) {
        qb.where('id', 'not in', excludedIds);
      }
      qb.join('languages', 'terms.language_id', 'languages.id');
      qb.where('languages.name', '=', 'Spanish');
      qb.orderByRaw('random()');
      qb.limit(3);
    }).fetchAll();
    const candidates = terms.serialize().map(({id, value}) => ({id, value}));
    candidates.push({id: relations.target.get('id'), value: relations.target.get('value')});
    return buildQuestion({section, source: relations.source, target: relations.target, candidates});
  }));

  return { id, type, instructions, questions };
};

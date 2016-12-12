//@flow
import Term from 'terminology/models/Term';
import TerminologyService from '/terminology/TerminologyService';
import type { ExamSection } from 'examinations/templates/exam-template';

import * as UUID from 'javascript/datatypes/uuid';
const questionOperations = [
  () => ({id: UUID.v4()}),
  ({ section }) => ({type: section.type}),
  () => ({text: ""}),
  ({ group }) => ({correctResponses: group.map((term) => ({termId: term.get('id'), categoryId: term.relations.categories.first().get('id')}))}),
  ({ group }) => ({categories: group.map((term) => ({id: term.relations.categories.first().get('id'), text: term.relations.categories.first().get('name')}))}),
  ({ group }) => ({terms: group.map((term) => ({id: term.get('id'), text: term.get('value')}))})
];

function buildQuestion(params) {
  return questionOperations.reduce((question, operation) => {
    return Object.assign(question, operation(params));
  }, {});
}

export default async (section: ExamSection, type: string, termService: TerminologyService) => {
  const {id, instructions } = section;

  const terms = await Term.query((qb) => {
    qb.join('languages', 'terms.language_id', 'languages.id');
    qb.where('languages.name', '=', 'Spanish');
    qb.orderByRaw('random()');
    qb.limit(section.itemCount(type) * 5);
  })
  .fetchAll({withRelated: ['categories']});

  const groups = terms.reduce((accumulator, term, index, array) => {
    let position = index + 1;
    if (position % 5 === 0) {
      accumulator.push(array.slice(position - 5, position));
    }
    return accumulator;
  }, []);

  const questions = groups.map((group) => {
    return buildQuestion({section, group});
  });

  return { id, type: section.type, instructions, questions };
};

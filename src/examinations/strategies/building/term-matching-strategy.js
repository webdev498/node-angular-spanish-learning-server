//@flow
import Translation from 'terminology/models/Translation';
import type { ExamSection } from 'examinations/templates/exam-template';

import * as UUID from 'javascript/datatypes/uuid';
const questionOperations = [
  () => ({id: UUID.v4()}),
  ({ section }) => ({type: section.type}),
  () => ({text: ''}),
  ({ group }) => ({correctResponses: group.map((translation) => ({candidateId: translation.relations.source.get('id'), termId: translation.relations.target.get('id')}))}),
  ({ group }) => ({ candidates: group.map((translation) => ({id: translation.relations.source.get('id'), text: translation.relations.source.get('value')}))}),
  ({ group }) => ({ terms: group.map((translation) => ({id: translation.relations.target.get('id'), text: translation.relations.target.get('value')}))})
];

function buildQuestion(params) {
  return questionOperations.reduce((question, operation) => {
    return Object.assign(question, operation(params));
  }, {});
}

export default async (section: ExamSection, type: string) => {
  const {id, instructions } = section;
  const translations = await Translation.random(section.itemCount(type) * 5);

  const groups = translations.reduce((accumulator, term, index, array) => {
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
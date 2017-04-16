// @flow
import QuestionTemplate from 'examinations/templates/questions/QuestionTemplate';
import type ExamSectionTemplate from 'examinations/templates/ExamSectionTemplate';
import type Term from 'terminology/models/Term';

export default class MultipleChoiceQuestionTemplate extends QuestionTemplate {

  constructor(section: ExamSectionTemplate, text: ?string) {
    super(section, text);
  }

  addCorrectResponseForTerm(term: Term) {
    this.correctResponses.push({ id: term.get('id') });
  }

  toJSON(): Object {
    const { id, type, text, correctResponses, terms, categories } = this;
    return { id, type, text, correctResponses, terms, categories };
  }
}

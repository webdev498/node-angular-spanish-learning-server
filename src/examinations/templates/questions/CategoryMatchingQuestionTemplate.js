// @flow
import QuestionTemplate from 'examinations/templates/questions/QuestionTemplate';
import type ExamSectionTemplate from 'examinations/templates/ExamSectionTemplate';
import type Term from 'terminology/models/Term';

export default class CategoryMatchingQuestionTemplate extends QuestionTemplate {

  constructor(section: ExamSectionTemplate, text: string = '') {
    super(section, text);
    this.categories = [];
    this.correctResponses = [];
  }

  addTerm(term: Term) {
    const id = term.get('id'),
          text = term.get('value');
    this.terms.push({ id, text });
  }

  addCategoryForTerm(term: Term) {
    const id = term.relations.categories.first().get('id'),
          text = term.relations.categories.first().get('name');
    this.categories.push({ id, text });
  }

  addCorrectResponseForTerm(term: Term) {
    const termId = term.get('id'),
          categoryId = term.relations.categories.first().get('id');
    this.correctResponses.push({ termId, categoryId });
  }

  toJSON() {
    const { id, type, text, correctResponses, categories, terms} = this;
    return { id, type, text, correctResponses, categories, terms };
  }
}

// @flow
import QuestionTemplate from 'examinations/templates/questions/QuestionTemplate';
import type ExamSectionTemplate from 'examinations/templates/ExamSectionTemplate';

export default class CategoryMatchingQuestionTemplate extends QuestionTemplate {

  constructor(section: ExamSectionTemplate, text: string = '') {
    super(section, text);
    this.correctResponses = [];
  }

  addCorrectResponseForTerm(term: BookshelfModel, category: BookshelfModel) {
    this.correctResponses.push({ termId: term.get('id'), categoryId: category.get('id') });
  }
  addCategoriesForTerm(category: BookshelfModel) {
    const hasCategory = this.categories.some(cat => cat.id === category.get('id'));
    if (!hasCategory) {
      this.categories.push({ id: category.get('id'), text: category.get('name') });
    }
  }

  toJSON() {
    const { id, type, text, correctResponses, categories, terms} = this;
    return { id, type, text, correctResponses, categories, terms };
  }
}

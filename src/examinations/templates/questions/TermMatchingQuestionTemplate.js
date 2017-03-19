// @flow
import QuestionTemplate from 'examinations/templates/questions/QuestionTemplate';
import type ExamSectionTemplate from 'examinations/templates/ExamSectionTemplate';
import type Translation from 'terminology/models/Translation';
import type Category from 'categories/models/Category';

export default class TermMatchingQuestionTemplate extends QuestionTemplate {
  candidates: Array<Translation>;

  constructor(section: ExamSectionTemplate, text: string = '') {
    super(section, text);
    this.candidates = [];
  }

  addTerm(translation: Translation) {
    const id = translation.relations.target.get('id'),
          text = translation.relations.target.get('value');

    this.terms.push({ id, text });
  }


  addCandidateResponses(translation: Translation) {
    const id = translation.relations.source.get('id'),
          text = translation.relations.source.get('value');

    this.candidates.push({ id, text });
  }

  addCorrectResponseForTerm(translation: Translation, category: Category) {
    const candidateId = translation.relations.source.get('id'),
          termId = translation.relations.target.get('id');

    this.correctResponses.push({ termId, candidateId, categoryId: category.get('id')});
  }

  toJSON() {
    const { id, type, text, correctResponses, candidates, terms, categories } = this;
    return { id, type, text, correctResponses, candidates, terms, categories };
  }

}

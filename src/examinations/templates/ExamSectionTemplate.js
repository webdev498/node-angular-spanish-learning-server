import * as UUID from 'javascript/datatypes/uuid';
import type ExaminationTemplate from './ExaminationTemplate';
import type QuestionTemplate from 'examinations/templates/questions/QuestionTemplate';

const SECTION_INSTRUCTIONS = {
  'Category Matching': 'Group each term by dragging from top to bottom, or checking each group match in sequence',
  'Term Matching': 'Drag the term to the correct match, or check each term that matches in sequence',
  'Multiple Choice Spanish': 'For the following questions choose the term the most correctly answers the question',
  'Multiple Choice English': 'For the following questions choose the term the most correctly answers the question'
};

export type SectionParameters = {
  type: string;
  weight: number;
  template: ExaminationTemplate;
  languages: Array<string>;
};

export default class ExamSectionTemplate {
    id: string;
    type: string;
    instructions: string;
    weight: number;
    exam: ExaminationTemplate;
    questions: Array<QuestionTemplate>;
    languages: Array<string>;

    constructor(section: SectionParameters) {
      Object.assign(this, section);
      this.id = UUID.v4();
      this.questions = [];
    }

    get itemCount(): number {
      return Math.floor(this.weight * this.exam.length);
    }

    get instructions(): string {
      return SECTION_INSTRUCTIONS[this.type];
    }

  /**
  * Returns a list of category constraints for the section
  * 
  * @readonly
  * 
  * @memberOf CategoryGroupingSection
  */
    get categoryConstraints(): Array<{ category: BookshelfModel; weight: number }> {
      const categoryConstraints = this.exam.constraints.filter(constraint => constraint.type === 'Category');
      const sortedConstraints = categoryConstraints.sort((prev, next) => {
        if (prev.weight > next.weight) return -1;
        if (prev.weight < next.weight) return 1;
        return 0;
      });
      return sortedConstraints;
    }

    /**
     * Returns a list of objects that describe the number of questions per category
     * { category: Category, count: number }
     * @readonly
     *
     * @memberOf CategoryGroupingSection
     */
    get categoryCounts(): Array<{ category: BookshelfModel; count: number }> {
      return this.categoryConstraints.map(({ category, weight }) => {
        return { category, count: Math.ceil(this.itemCount * weight) };
      });
    }

    get categories(): BookshelfCollection {
      return this.exam.categoriesCovered;
    }

    addQuestion(question: QuestionTemplate) {
      this.questions.push(question);
    }

    addQuestions(questions: Array<QuestionTemplate>) {
      this.questions = this.questions.concat(questions);
    }

    toJSON(): Object {
      const { id, type, instructions, questions } = this;
      return {
        id,
        type,
        instructions,
        questions: questions.map(question => question.toJSON())
      };
    }
}

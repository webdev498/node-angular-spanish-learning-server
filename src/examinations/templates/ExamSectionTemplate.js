import * as UUID from 'javascript/datatypes/uuid';
import type ExaminationTemplate from './ExaminationTemplate';
import type QuestionTemplate from 'examinations/templates/questions/QuestionTemplate';
import type Category from 'categories/models/Category';

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
    constraints: { category: Category; weight: number};
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

    addQuestion(question: QuestionTemplate) {
      this.questions.push(question);
    }

    addQuestions(questions: Array<QuestionTemplate>) {
      this.questions = this.questions.concat(questions);
    }

    getCountForCategory(categoryName: string): number {
      const constrainingFunction = this.constraints.categories[categoryName];
      return constrainingFunction ? Math.floor(constrainingFunction(this.itemCount)) : 0;
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

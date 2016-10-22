/* @flow */
import Orm from 'data/orm';
import Base from 'models/Base';

export type ExamResponse = {
  sectionId: string;
  questionId: string;
  responses: Array<Object>
}

export type ExamSubmission = {
  id: string;
  responses: Array<ExamResponse>;
}

export type ExamSection = {
  id: string;
  type: string;
  instructions: string;
  questions: Array<Object>;
};

const persistenceWhitelist = ['content', 'created_at', 'updated_at'];

const Examination = Base.extend({
  tableName: 'exams',

  virtuals: {
    sections() {
      return this.get('content').sections;
    }
  },

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  addSections(sections) {
    const content = this.get('content');
    Array.prototype.push.apply(content.sections, sections);
  },

  serialize() {
    const { id, content } = this.attributes;
    content.sections = content.sections.map((section) => {
      section.questions = section.questions.map((question) => {
        delete question.correctResponses;
        return question;
      });
      return section;
    });

    return {
      id,
      ...content
    };
  },

  validate() {}
});

export default Orm.model('Examination', Examination);

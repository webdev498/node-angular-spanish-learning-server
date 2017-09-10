/* @flow */
import Orm from 'data/orm';
import Base from 'models/Base';
import ExaminationTemplate from 'examinations/templates/ExaminationTemplate';

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

const persistenceWhitelist = ['content', 'userId', 'created_at', 'updated_at'];

const Examination = Base.extend(
  {
    tableName: 'exams',

    virtuals: {
      sections() {
        return this.get('content').sections;
      }
    },

    initialize(attributes) {
      Base.prototype.initialize.call(this, attributes, {persistenceWhitelist});
    },

    addSections(sections) {
      const content = this.get('content');
      Array.prototype.push.apply(content.sections, sections);
    },

    serialize() {
      const {id, content, userId } = this.attributes;
      content.sections = content.sections.map((section) => {
        if (content.mode !== 'practice') {
          section.questions = section.questions.map((question) => {
            delete question.correctResponses;
            return question;
          });
        }
        return section;
      });

      return {
        id,
        userId,
        ...content
      };
    },

    validate() {
    }
  },
  {
    fromTemplate(template: ExaminationTemplate, userId: String) {
      const exam = Examination.forge({content: template.toJSON(), userId});
      return exam;
    }
  }
);

export default Orm.model('Examination', Examination);

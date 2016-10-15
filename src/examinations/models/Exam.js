/* @flow */
import Orm from 'data/orm';
import Base from 'models/Base';

const tableName = 'exams';
const persistenceWhitelist = ['content', 'created_at', 'updated_at'];

const Term = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  addSection(section) {
    const content = this.get('content');
    content.sections.push(section);
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

export default Orm.model('Exam', Term);

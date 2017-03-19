/* @flow */
import Orm from 'data/orm';
import Base from 'models/Base';

const tableName = 'exam_results';
const persistenceWhitelist = [
  'itemCount',
  'pointsAwarded',
  'pointsPossible',
  'examId',
  'userId',
  'createdAt'];

const ExaminationResult = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  categoryResults() {
    return this.hasMany('CategoryExamResult', 'exam_result_id', 'id');
  },


  serialize() {
    const {
      id, createdAt, examId, itemCount,
      pointsAwarded, pointsPossible, sections
    } = this.attributes;
    const { relations } = this;

    return {
      id,
      createdAt,
      examId,
      itemCount,
      pointsPossible,
      pointsAwarded,
      sections,
      relations
    };
  },

  validate() {}
});

export default Orm.model('ExaminationResult', ExaminationResult);

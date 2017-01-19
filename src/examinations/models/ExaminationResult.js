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


  serialize() {
    const { id, createdAt, examId, itemCount, pointsAwarded, pointsPossible, sections } = this.attributes;

    return {
      id,
      createdAt,
      examId,
      itemCount,
      pointsPossible,
      pointsAwarded,
      sections
    };
  },

  validate() {}
});

export default Orm.model('ExaminationResult', ExaminationResult);

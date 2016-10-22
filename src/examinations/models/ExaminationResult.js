/* @flow */
import Orm from 'data/orm';
import Base from 'models/Base';

const tableName = 'exam_results';
const persistenceWhitelist = [
  'itemCount',
  'pointsAwarded',
  'pointsPossible',
  'examId',
  'userId'];

const ExaminationResult = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },


  serialize() {
    const { id, examId, itemCount, pointsAwarded, pointsPossible, sections } = this.attributes;

    return {
      id,
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

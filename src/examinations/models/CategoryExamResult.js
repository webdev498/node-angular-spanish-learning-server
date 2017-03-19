/* @flow */
import Orm from 'data/orm';
import Base from 'models/Base';

const persistenceWhitelist = [
  'categoryId',
  'examResultId',
  'correctCount',
  'incorrectCount',
  'updatedAt'
];

const CategoryExamResult = Base.extend({
    tableName: 'categories_exams_results',

    initialize(attributes) {
      Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
    },

    addToCorrectCount(amount: number) {
      this.addToCount('correctCount', amount);
    },

    addToIncorrectCount(amount: number) {
      this.addToCount('incorrectCount', amount);
    },

    addToCount(countType: string, amount: number) {
      const currentCount = parseInt(this.get(countType), 10);
      const nextCount = isNaN(currentCount) ? (0 + amount) : (currentCount + amount);
      this.set(countType, nextCount);
    },

    serialize() {
      const {
        id, categoryId, examResultId, correctCount,
        incorrectCount, createdAt, updatedAt } = this.attributes;

      return {
        id,
        categoryId,
        examResultId,
        correctCount,
        incorrectCount,
        createdAt,
        updatedAt
      };
    },

    validate() {
    }
  }
);

export const CategoryExamResults = Orm.Collection.extend({
  model: CategoryExamResult
});

export default Orm.model('CategoryExamResult', CategoryExamResult);

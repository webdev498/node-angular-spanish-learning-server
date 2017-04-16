import ExamSectionTemplate from '../ExamSectionTemplate';
import type Category from 'categories/models/Category';

export default class MultipleChoiceSectionTemplate extends ExamSectionTemplate {

  /**
   * The number of foil response (None of the Above) in the section
   * 10% of questions in the section
   *
   * @readonly
   * 
   * @memberOf MultipleChoiceSectionTemplate
   */
  get foilCount() {
    return Math.floor(this.itemCount * 0.10); // 10% of questions will have a foil response
  }

  /**
   * Returns a list of category constraints for the section
   * 
   * @readonly
   * 
   * @memberOf MultipleChoiceSectionTemplate
   */
  get categoryConstraints() {
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
   * @memberOf MultipleChoiceSectionTemplate
   */
  get categoryCounts(): { category: Category; count: number } {
    return this.categoryConstraints.map(({category, weight}) => {
      return { category, count: Math.ceil(this.itemCount * weight) };
    });
  }

  get language() {
    return this.type.split(' ').pop();
  }

}
import ExamSectionTemplate from '../ExamSectionTemplate';

export default class CategoryMatchingSectionTemplate extends ExamSectionTemplate {

  termsPerItem = 5;

  /**
       *
       *
       * @param {string} categoryId 
       * @returns {number}
       * 
       * @memberOf ExamSectionTemplate
       */
  getCountForCategory(category: BookshelfModel): number {
    const constraint =  this.categoryConstraints.find(constraint => constraint.category.get('name') === category.get('name'));
    if (constraint) {
      return constraint.weight * this.termsInSection;
    } else {
      throw new Error(`No category constraint exists for category ${category.get('name')}`);
    }
  }

  get termsInSection(): number {
    return this.itemCount * this.termsPerItem;
  }

  get categoryCounts(): Array<{ category: BookshelfModel; count: number }> {
    return this.categoryConstraints.map(({ category, weight }) => {
      return { category, count: Math.ceil(this.itemCount * weight) };
    });
  }

}
import ExamSectionTemplate from '../ExamSectionTemplate';

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
  
  get language(): string {
    return this.type.split(' ').pop();
  }

}
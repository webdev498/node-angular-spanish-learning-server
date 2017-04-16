//@flow
import ExaminationTemplate from 'examinations/templates/ExaminationTemplate';
import ExamSectionTemplate from 'examinations/templates/ExamSectionTemplate';
import { expect } from 'chai';

describe('Examination templates', () => {
  describe('adding a Examination Section template', () => {
    const template = new ExaminationTemplate('short');
    const initialSectionCount = template.sections.length;

    beforeEach(() => {
      template.addSection(new ExamSectionTemplate({}));
    });

    it('increases the number of exam sections in the template', () => {
      expect(template.sections).to.have.lengthOf(initialSectionCount + 1);
    });

  });

  describe('when converting to JSON', () => {
    const template = new ExaminationTemplate('short');
    const json = template.toJSON();

    it('includes a sections property that is enumerable', () => {
      expect(json).to.have.property('sections');
      expect(json.sections).to.have.length(0);
    });

    it('includes a length property that is a number', () => {
      expect(json).to.have.property('length', 40);
    });

    it('includes a categoriesCovered property that is an array', () => {
      expect(json).to.have.property('categoriesCovered');
      expect(json.categoriesCovered).to.have.length(0);
    });
  });
});

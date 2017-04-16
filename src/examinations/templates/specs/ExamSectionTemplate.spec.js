//@flow

import ExamSectionTemplate from 'examinations/templates/ExamSectionTemplate';
import ExaminationTemplate from 'examinations/templates/ExaminationTemplate';
import { expect } from 'chai';

describe('Examination Section template', () => {
  describe('item count', () => {
    describe('when the weight is 30%', () => {
      const weight = 0.30;
      describe('and the exam is short', () => {
        const exam = new ExaminationTemplate('short');
        const section = new ExamSectionTemplate({
          exam,
          weight
        });
        it('equals 9 items', () => {
          expect(section.itemCount).to.equal(12 );
        });
      });
    });
  });

  describe('getting the item count for a given category', () => {
    const exam = new ExaminationTemplate('short');
    const section = new ExamSectionTemplate({
      exam,
      weight: 0.30,
      constraints: {
        'categories': {
          'General': (sectionLength) => sectionLength * .6
        }
      }
    });
    it('calculates the count based on the length of the exam template and the constraining function', () => {
      expect(section.getCountForCategory('General')).to.equal(7);
    });
  });
});

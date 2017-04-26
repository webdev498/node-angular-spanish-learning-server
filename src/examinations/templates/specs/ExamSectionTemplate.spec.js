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
});

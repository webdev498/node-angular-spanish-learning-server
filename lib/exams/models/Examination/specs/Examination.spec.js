import Examination from '../'

import { expect } from 'chai';

describe('An Examination', () => {
  describe('in order to be valid', () => {
    let examination;

    before(() => {
      examination = new Examination({
        title: 'Introductory Anatomy and Phisiology',
        instructions: 'Please complete each question to the best of your ability',
        questions: [
          {
            type: 'Multiple Choice',
            text: 'What is the longest bone in the body?',
            instructions: 'Choose the most appropriate answer',
            choices: [
              { text: 'Femur ', selected: false },
              { text: 'Humerus', selected: false }
            ],
            correctChoice: { text: 'Femur ', selected: false }
          }
        ]
      });
    });

    it('requires the presence of a title', () => {
      let { title } = examination;
      examination.title = null;
      expect(examination.isValid()).to.be.false;
      examination.title = title;
      expect(examination.isValid()).to.be.true;
    });

    it('requires the presence of instructions', () => {
      let { instructions } = examination;
      examination.instructions = null;
      expect(examination.isValid()).to.be.false;
      examination.instructions = instructions;
      expect(examination.isValid()).to.be.true;
    });

    it('requires at least one question', () => {
      let { questions } = examination;
      examination.questions = [];
      expect(examination.isValid()).to.be.false;
      examination.questions = questions;
      expect(examination.isValid()).to.be
    })
  });
});

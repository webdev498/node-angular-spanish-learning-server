import Question from '../';
import { expect } from 'chai';

describe('A Question', () => {
  describe('in order to be valid', () => {
    let question;

    before(() => {

      question = new Question({
        type: 'Multiple Choice',
        instructions: 'Select on of the following options',
        text: 'Who is the queen of England?',
        choices: [
          { id: 123, text: 'Queen Elizabeth II', selected: true },
          { id: 456, text: 'Ann Hathaway', selected: false }
        ],
        correctChoice: { id: 123, text: 'Queen Elizabeth II', selected: true },
        createdAt: 'November 3, 2015 13:00',
        updatedAt: 'November 3, 2015 15:00'
      });
    });

    it('requires the presence of a description and that it be a string', () => {
      let { instructions } = question;
      question.instructions = null;
      expect(question.isValid()).to.be.false;
      question.instructions = instructions;
      expect(question.isValid()).to.be.true;
    });

    it('requires that the type be it be a string', () => {
      let { type } = question;
      question.type = null;
      expect(question.isValid()).to.be.false;
      question.type = type;
      expect(question.isValid()).to.be.true;
    });

    it('requires that the text be it be a string', () => {
      let { text } = question;
      question.text = null;
      expect(question.isValid()).to.be.false;
      question.text = text;
      expect(question.isValid()).to.be.true;
    });

  });
});

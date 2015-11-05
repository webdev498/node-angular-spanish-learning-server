import { expect } from 'chai';

import Choice from '../'

describe('A Choice', () => {
  describe('in order to be valid', () => {
    let choice;
    before(() => {
      choice = new Choice({
        text: 'The speed of light',
        selected: false
      });
    });

    it('requires text', () => {
      let { text } = choice;
      choice.text = null;
      expect(choice.isValid()).to.be.false;
      choice.text = text;
      expect(choice.isValid()).to.be.true;
    });

    it('requires that selected be a boolean value', () => {
      let { selected } = choice;
      choice.selected = 'false';
      expect(choice.isValid()).to.be.false;
      choice.selected = selected;
      expect(choice.isValid()).to.be.true;
    });
  });
});

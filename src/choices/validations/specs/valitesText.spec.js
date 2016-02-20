import { expect } from 'chai';
import validatesText from './../validatesText';

let invalidModel = {
  attributes: {
    text: ''
  }
};
describe('validating choice\'s text', () => {
  describe('when password length is less than 1 character', () => {
    it('raises a PasswordComplexityError', () => {
      expect(() => { validatesText(invalidModel); }).to.throw(TypeError);
    });
  });
});

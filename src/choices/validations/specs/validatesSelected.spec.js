import { expect } from 'chai';
import validatesSelected from './../validatesSelected';

describe('validating selected', () => {

  describe('when the selected is not a boolean value', () => {
    let invalidModel = {
      attributes: {
        selected: null
      }
    };
    it('raises and InvalidEmailError', () => {
      expect(() => { validatesSelected(invalidModel); }).to.throw(TypeError);
    });
  });
});

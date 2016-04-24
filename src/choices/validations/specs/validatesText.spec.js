import { expect } from 'chai';
import validatesText from './../validatesText';
import EmptyTextError from './../../exceptions/EmptyTextError';

let attributes = { text: '' };

describe('validating choice\'s text', () => {
  describe('when password length is less than 1 character', () => {
    it('raises an EmptyTextError', () => {
      expect(() => { validatesText(attributes); }).to.throw(EmptyTextError);
    });
  });
});

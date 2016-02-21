import { expect } from 'chai';
import PasswordComplexityError from './../../exceptions/PasswordComplexityError';
import validatesPasswordComplexity from './../validatesPasswordComplexity';

describe('validating password complexity', () => {
  describe('invalid password', () => {
    let attributes = {
        password: ''
      };

    describe('when password length is less than 1 character', () => {
      it('raises a PasswordComplexityError', () => {
        expect(() => { validatesPasswordComplexity(attributes); }).to.throw(PasswordComplexityError);
      });
    });
  });
});

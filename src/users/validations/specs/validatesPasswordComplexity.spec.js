import { expect } from 'chai';
import validatesPasswordComplexity from './../validatesPasswordComplexity';
import PasswordComplexityError from './../../exceptions/PasswordComplexityError';

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

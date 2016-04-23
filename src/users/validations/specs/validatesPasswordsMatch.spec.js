import { expect } from 'chai';
import validatesPasswordsMatch from './../validatesPasswordsMatch';
import PasswordMatchError from './../../exceptions/PasswordMatchError';

describe('validating password matches confirmation', () => {

  describe('when the password and the password confirmation do not match', () => {
    let attributes = {
        password: 'pass123',
        passwordConfirmation: 'pss123'
      };

    it('raises a PasswordMatchError', () => {
      expect(() => { validatesPasswordsMatch(attributes); }).to.throw(PasswordMatchError);
    });
  });

  describe('when the password and the password confirmation do match', () => {
    let attributes = {
        password: 'pass123',
        passwordConfirmation: 'pass123'
      };

    it('does not raises a PasswordMatchError', () => {
      expect(() => { validatesPasswordsMatch(attributes); }).to.not.throw(PasswordMatchError);
    });
  });

});

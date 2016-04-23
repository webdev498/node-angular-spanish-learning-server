import { expect } from 'chai';
import validatesEmailAddress from './../validatesEmailAddress';
import InvalidEmailError from './../../exceptions/InvalidEmailError';

describe('validating email addresses', () => {

  describe('when the email address is invalid', () => {
    let attributes = {
        email: 'my.invalid.email-com'
      };

    it('raises an InvalidEmailError', () => {
      expect(() => { validatesEmailAddress(attributes); }).to.throw(InvalidEmailError);
    });
  });

  describe('when the email address is not valid', () => {
    let attributes = {
        email: 'user@somehost.net'
      };


    it('does not raise an InvalidEmailError', () => {
      expect(() => { validatesEmailAddress(attributes); }).to.not.throw(InvalidEmailError);
    });
  });

});

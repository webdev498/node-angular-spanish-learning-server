import { expect } from 'chai';
import PasswordMatchError from './../PasswordMatchError';

describe('PasswordMatchError', () => {
  describe('instantiation', () => {

    describe('when not passed a message argument', () => {
      it('sets a default value', () => {
        expect(new PasswordMatchError().message).to.equal('Password and Password Confirmation do not match.');
      });
    });

    it('generates a stack trace', () => {
      expect(new PasswordMatchError().stack).to.be.defined;
    });

  });
});

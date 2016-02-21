import { expect } from 'chai';
import UserPasswordMismatchError from './../UserPasswordMismatchError';

describe('UserPasswordMismatchError', () => {
  describe('instantiation', () => {

    describe('when not passed a message argument', () => {
      it('sets a default value', () => {
        expect(new UserPasswordMismatchError().message).to.equal('The provided password does not match the password for this user.');
      });
    });

    it('generates a stack trace', () => {
      expect(new UserPasswordMismatchError().stack).to.be.defined;
    });

  });
});

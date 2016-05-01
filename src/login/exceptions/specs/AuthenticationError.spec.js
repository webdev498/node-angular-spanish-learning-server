import { expect } from 'chai';
import AuthenticationError from './../AuthenticationError';

describe('AuthenticationError', () => {
  describe('instantiation', () => {

    describe('when not passed a message argument', () => {
      it('sets a default value', () => {
        expect(new AuthenticationError().message).to.equal('Unable to authenticate user');
      });
    });

    it('generates a stack trace', () => {
      expect(new AuthenticationError().stack).to.be.defined;
    });

  });
});
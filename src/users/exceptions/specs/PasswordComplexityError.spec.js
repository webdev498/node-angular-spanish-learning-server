import { expect } from 'chai';
import PasswordComplexityError from './../PasswordComplexityError';

describe('PasswordComplexityError', () => {
  describe('instantiation', () => {

    describe('when not passed a message argument', () => {
      it('sets a default value', () => {
        expect(new PasswordComplexityError().message).to.equal('Password does not meet the complexity requirements.');
      });
    });

    it('generates a stack trace', () => {
      expect(new PasswordComplexityError().stack).to.be.defined;
    });

  });
});

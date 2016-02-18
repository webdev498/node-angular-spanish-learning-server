import { expect } from 'chai';
import InvalidEmailError from './../InvalidEmailError';

describe('InvalidEmailError', () => {
  describe('instantiation', () => {

    describe('when not passed a message argument', () => {
      it('sets a default value', () => {
        expect(new InvalidEmailError().message).to.equal('Email address is not a valid format');
      });
    });

    it('generates a stack trace', () => {
      expect(new InvalidEmailError().stack).to.be.defined;
    });

  });
});

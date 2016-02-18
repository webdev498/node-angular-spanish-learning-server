import { expect } from 'chai';
import * as RequestExceptionFactory from './../Factory';
import UnprocessableEntity from './../requests/UnprocessableEntity';
import {
  EmptyTextError
} from './../../choices/exceptions';

import {
  PasswordMatchError,
  PasswordComplexityError,
  InvalidEmailError,
  UserPasswordMismatchError
} from './../../users/exceptions';



describe('Exception factory', () => {

  let requestDouble = {
    method: 'post',
    path: '/',
    orig: {},
    info: {remoteAddress: '192.168.1.1'}
  };

  describe('when given EmptyTextError', () => {
    it('returns an UnprocessableEntityError', () => {
      expect(RequestExceptionFactory.create(requestDouble, new EmptyTextError())).to.be.a.instanceof(UnprocessableEntity);
    });
  });

  describe('when given PasswordMatchError', () => {
    it('returns an UnprocessableEntityError', () => {
      expect(RequestExceptionFactory.create(requestDouble, new PasswordMatchError())).to.be.a.instanceof(UnprocessableEntity);
    });
  });

  describe('when given PasswordComplexityError', () => {
    it('returns an UnprocessableEntityError', () => {
      expect(RequestExceptionFactory.create(requestDouble, new PasswordComplexityError())).to.be.a.instanceof(UnprocessableEntity);
    });
  });

  describe('when given InvalidEmailError', () => {
    it('returns an UnprocessableEntityError', () => {
      expect(RequestExceptionFactory.create(requestDouble, new InvalidEmailError())).to.be.a.instanceof(UnprocessableEntity);
    });
  });

  describe('when given UserPasswordMismatchError', () => {
    it('returns an UnprocessableEntityError', () => {
      expect(RequestExceptionFactory.create(requestDouble, new UserPasswordMismatchError())).to.be.a.instanceof(UnprocessableEntity);
    });
  });

});

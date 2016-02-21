import { expect } from 'chai';
import * as RequestExceptionFactory from './../Factory';
import UnprocessableEntity from './../requests/UnprocessableEntity';
import {
  EmptyTextError
} from './../../choices/exceptions';

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

});

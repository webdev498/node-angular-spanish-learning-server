import { expect } from 'chai';
import { stub } from 'sinon';
import User from './../../models/User';
import * as UserService from './../';
import * as LoggingService from './../../../logging';

describe('Users service get', () => {
  let userModelDouble = {},
  user = { id: 1};

  beforeEach(() => {
    userModelDouble = {};

    stub(LoggingService, 'logInfo');
    stub(LoggingService, 'logError');
    stub(User, 'forge').returns(userModelDouble);

  });

  afterEach(() => {
    User.forge.restore();
    LoggingService.logError.restore();
    LoggingService.logInfo.restore();
  });

  describe('when record exists in database', () => {
    beforeEach(() => {
      userModelDouble.fetch = stub().returns(Promise.resolve(user));
    });

    it('fetching user', () => UserService.get(user.id).then((result) => expect(result).to.equal(user)));
  });

  describe('when there is a database error', () => {
    let error = new Error();

    beforeEach(() => {
      userModelDouble.fetch = stub().returns(Promise.reject(error));
    });
    it('fetching a user error', () => UserService.get(user.id).catch((errorResult) => expect(errorResult).to.equal(error)));
  });
});

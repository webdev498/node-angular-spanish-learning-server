import { expect } from 'chai';
import { stub } from 'sinon';
import User from './../../models/User';
import * as UserService from './../';
import * as LoggingService from './../../../logging';

describe('Users service getByEmail', () => {
  let userModelDouble = {};
  let user = { id: 1, email: 'test@test.com'};

  beforeEach(() => {
    userModelDouble = {};

    stub(LoggingService, 'logInfo');
    stub(LoggingService, 'logError');
    stub(User, 'where').returns(userModelDouble);
  });

  afterEach(() => {
    User.where.restore();
    LoggingService.logError.restore();
    LoggingService.logInfo.restore();
  });

  describe('when record exists in database', () => {
    beforeEach(() => {
      userModelDouble.fetch = stub().returns(Promise.resolve(user));
    });

    it('fetching user by email', () => UserService.getByEmail(user.email).then((result) => expect(result).to.equal(user)));
  });

  describe('when there is a database error', () => {
    let error = new Error();

    beforeEach(() => {
      userModelDouble.fetch = stub().returns(Promise.reject(error));
    });
    it('fetching a user by email error', () => UserService.getByEmail(user.email).catch((errorResult) => expect(errorResult).to.equal(error)));
  });
});

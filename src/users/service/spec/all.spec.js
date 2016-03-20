import { expect } from 'chai';
import { stub } from 'sinon';
import User from './../../models/User';
import * as UserService from './../';
import * as LoggingService from './../../../logging';

describe('Users service FetchAll', () => {
  let userModelDouble = {},
    users = [];

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

  describe('when there are records in the database', () => {
    beforeEach(() => {
      userModelDouble.fetchAll = stub().returns(Promise.resolve(users));
    });

    it('fetching all users', () => UserService.all().then(result => expect(result).to.equal(users)));
  });

  describe('when there is a database error', () => {
    let error = new Error();

    beforeEach(() => {
      userModelDouble.fetchAll = stub().returns(Promise.reject(error));
    });
    it('fetching all users error', () => UserService.all().catch(errorResult => expect(errorResult).to.equal(error)));
  });
});

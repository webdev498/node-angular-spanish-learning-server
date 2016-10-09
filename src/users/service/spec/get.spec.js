import { stub } from 'sinon';
import User from 'users/models/User';
import UserService from 'users/service/UserService';
import * as LoggingService from 'logging';

describe('Users service get', () => {
  const userModelDouble = {};
  const user = { id: 1};
  const service = new UserService();

  before(() => {
    userModelDouble.fetch = stub().returns(Promise.resolve(userModelDouble));
    stub(LoggingService, 'logInfo');
    stub(LoggingService, 'logError');
    stub(User, 'where').returns(userModelDouble);
  });

  after(() => {
    User.where.restore();
    LoggingService.logError.restore();
    LoggingService.logInfo.restore();
  });

  describe('when record exists in database', () => {
    let result;

    before(async () => {
      userModelDouble.fetch = stub().returns(Promise.resolve(user));
      result = await service.get(user);
    });

    it('fetching user', () => {
      expect(result).to.equal(user);
    });
  });

  describe('when there is a database error', () => {
    let error = new Error();

    before(() => {
      userModelDouble.fetch = stub().returns(Promise.reject(error));
    });

    it('fetching a user error', async () => {
      try {
        await service.get(user);
      } catch (err) {
        expect(err).to.equal(error);
      }
    });
  });
});

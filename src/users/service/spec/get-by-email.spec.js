import { stub } from 'sinon';
import User from 'users/models/User';
import UserService from 'users/service/UserService';
import * as logger from 'logging';

describe('Users service getByEmail', () => {
  let userModelDouble = {};
  let user = { id: 1, email: 'test@test.com'};
  const service = new UserService();

  before(() => {
    userModelDouble = {};
    stub(logger, 'logInfo');
    stub(logger, 'logError');
    stub(User, 'where').returns(userModelDouble);
  });

  after(() => {
    User.where.restore();
    logger.logInfo.restore();
    logger.logError.restore();
  });

  describe('when record exists in database', () => {
    let result;
    before(async () => {
      userModelDouble.fetch = stub().returns(Promise.resolve(user));
      result = await service.getByEmail(user.email);
    });

    it('fetching user by email', () => {
      expect(result).to.equal(user);
    });
  });

  describe('when there is a database error', () => {
    let error = new Error();

    before(() => {
      userModelDouble.fetch = stub().returns(Promise.reject(error));
    });

    it('fetching a user by email error', async () => {
      try {
        await service.getByEmail(user.email);
      } catch (err) {
        expect(err).to.equal(error);
      }
    });
  });
});

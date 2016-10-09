import { stub } from 'sinon';
import User from 'users/models/User';
import UserService from 'users/service/UserService';
import * as logger from 'logging';

describe('Users service FetchAll', () => {
  const service = new UserService();
  const userModelDouble = {};
  const users = [];

  before(() => {
    stub(User, 'forge').returns(userModelDouble);
    stub(logger, 'logInfo');
  });

  after(() => {
    User.forge.restore();
    logger.logInfo.restore();
  });

  describe('when there are records in the database', () => {
    let result;

    beforeEach(async () => {
      userModelDouble.fetchAll = stub().returns(Promise.resolve(users));
      result = await service.all();
    });

    it('fetching all users', () => {
      expect(result).to.equal(users);
    });
  });

  describe('when there is a database error', () => {
    let error = new Error();

    beforeEach(() => {
      userModelDouble.fetchAll = stub().returns(Promise.reject(error));
    });

    it('fetching all users error', async () => {
      try {
        await service.all();
      } catch (err) {
        expect(err).to.equal(error);
      }
    });
  });
});

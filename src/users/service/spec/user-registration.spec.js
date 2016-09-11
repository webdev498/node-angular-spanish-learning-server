import { stub } from 'sinon';
import User from 'users/models/User';
import UserService from 'users/service/UserService';
import * as logger from 'logging';

const payload = {
  firstName: 'Joe',
  lastName: 'User',
  email: 'joe@altvista.net',
  password: 'secret',
  passwordConfirmation: 'secret',
  nationalityId: '12003asdpkdas'
};

describe('Users service', () => {
  describe('registering a new user', () => {
    const service = new UserService();

    before(() => {
      stub(logger, 'logInfo');
      stub(logger, 'logError');
    });

    after(() => {
      logger.logError.restore();
      logger.logInfo.restore();
    });

    describe('whent he save is successful', () => {
      let result;
      const userModelDouble = { save: () => {}, tap: () => {} };
      const saveResult = {};

      before(async () => {
        stub(User, 'forge').returns(userModelDouble);
        stub(userModelDouble, 'save').returns(userModelDouble);
        stub(userModelDouble, 'tap').returns(Promise.resolve(saveResult));
        result = await service.signup({payload});
      });

      after(() => {
        User.forge.restore();
      });

      it('resolves the user', () => {
        expect(result).to.equal(saveResult);
      });
    });

    describe('when the save was unsuccessful', () => {
      const userModelDouble = { save: () => {}, tap: () => {} };
      const error = new Error();

      before(() => {
        stub(userModelDouble, 'save').returns(userModelDouble);
        stub(userModelDouble, 'tap').returns(Promise.reject(error));
        stub(User, 'forge').returns(userModelDouble);
      });

      after(() => {
        User.forge.restore();
      });

      it('raises an error', async () => {
        try {
          await service.signup({payload});
        } catch (err) {
          expect(err).to.equal(error);
        }
      });
    });
  });
});

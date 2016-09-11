import { expect } from 'chai';
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

const params = { id: '29asd-ask2eadk-2aasdd'};

describe('Users service', () => {
  const service = new UserService();
  const userModelDouble = { fetch: () => userModelDouble };

  describe('Updating an existing user', () => {
    before(() => {
      stub(logger, 'logInfo');
      stub(logger, 'logError');
    });

    after(() => {
      logger.logError.restore();
      logger.logInfo.restore();
    });

    describe('when the save is successful', () => {
      before(() => {
        stub(User, 'where').returns(userModelDouble);
        userModelDouble.save = stub().returns(Promise.resolve(userModelDouble));
      });

      after(() => {
        User.where.restore();
      });

      it('resolves the user', async () => {
        expect(await service.update({ params, payload})).to.equal(userModelDouble);
      });
    });

    describe('when the save was unsuccessful', () => {
      const error = new Error();

      before(() => {
        stub(User, 'where').returns(userModelDouble);
        userModelDouble.save = stub().returns(Promise.reject(error));
      });

      after(() => {
        User.where.restore();
      });

      it('rejects an error', async () => {
        try {
          await service.update({ params, payload });
        } catch(err) {
          expect(err).to.equal(error);
        }
      });
    });

  });
});

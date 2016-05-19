import { expect } from 'chai';
import { stub } from 'sinon';
import User from './../../models/User';
import * as LoggingService from './../../../logging';
import * as UserService from './../';

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
  describe('Updating an existing user', () => {
    let userModelDouble = {};

    beforeEach(() => {
      userModelDouble = {};

      stub(LoggingService, 'logInfo');
      stub(LoggingService, 'logError');
      stub(User, 'forge').returns(userModelDouble);

      userModelDouble.fetch = stub().returns(Promise.resolve(userModelDouble));
      userModelDouble.save = stub().returns(Promise.resolve(userModelDouble));
    });

    afterEach(() => {
      User.forge.restore();
      LoggingService.logError.restore();
      LoggingService.logInfo.restore();
    });

    it('logs information to the logger', (done) => {
      UserService.update({ params, payload }).then(() => {
        expect(LoggingService.logInfo).to.have.been.called;
        done();
      });
    });

    it('delegates to the #forge method on the User model', (done) => {
      UserService.update({ params, payload }).then(() => done());
      expect(User.forge).to.have.been.called;
    });

    it('attempts to save the model', (done) => {
      UserService.update({ params, payload }).then(() => {
        expect(userModelDouble.save).to.have.been.called;
        done();
      });
    });

    describe('whent he save is successful', () => {
      it('resolves the user', (done) => {
        UserService.update({ params, payload }).then((result) => {
          expect(result).to.equal(userModelDouble);
          done();
        });
      });
    });

    describe('when the save was unsuccessful', () => {
      let error = {};
      beforeEach(() => {
        userModelDouble.save = stub().returns(Promise.reject(error));
      });

      it('logs an error', (done) => {
        UserService.update({ params, payload }).then(() => {}, () => {
          expect(LoggingService.logError).to.have.been.called;
          done();
        });
      });

      it('rejects an error', (done) => {
        UserService.update({ params, payload }).then(() => {}, (saveError) => {
          expect(saveError).to.equal(error);
          done();
        });
      });
    });

  });
});

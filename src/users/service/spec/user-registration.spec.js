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

describe('Users service', () => {
  describe('registering a new user', () => {
    let userModelDouble = {};
    let saveMock;

    beforeEach(() => {
      userModelDouble = { save: () => {}, tap: () => {} };

      stub(LoggingService, 'logInfo');
      stub(LoggingService, 'logError');
      stub(User, 'forge').returns(userModelDouble);
      stub(userModelDouble, 'save').returns(userModelDouble);
      saveMock = stub(userModelDouble, 'tap').returns(Promise.resolve());
    });

    afterEach(() => {
      User.forge.restore();
      LoggingService.logError.restore();
      LoggingService.logInfo.restore();
    });

    it('logs information to the logger', done => {
      UserService.signup({ payload }).then(() => {
        expect(LoggingService.logInfo).to.have.been.called;
        done();
      });
    });

    it('delegates to the #forge method on the User model', done => {
      UserService.signup({ payload }).then(() => done());
      expect(User.forge).to.have.been.called;
    });

    it('attempts to save the model', done => {
      UserService.signup({ payload }).then(() => {
        expect(userModelDouble.save).to.have.been.called;
        done();
      });
    });

    describe('whent he save is successful', () => {
      let saveResult = {};
      beforeEach(() => {
        saveMock.returns(Promise.resolve(saveResult));
      });

      it('resolves the user', done => {
        UserService.signup({ payload }).then(result => {
          expect(result).to.equal(saveResult);
          done();
        });
      });
    });

    describe('when the save was unsuccessful', () => {
      let error = {};
      beforeEach(() => {
        saveMock.returns(Promise.reject(error));
      });

      it('logs an error', done => {
        UserService.signup({ payload }).then(() => {}, () => {
          expect(LoggingService.logError).to.have.been.called;
          done();
        });
      });

      it('rejects an error', done => {
        UserService.signup({ payload }).then(() => {}, saveError => {
          expect(saveError).to.equal(error);
          done();
        });
      });
    });

  });
});

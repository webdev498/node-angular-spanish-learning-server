import { expect } from 'chai';
import { stub, spy } from 'sinon';
import User from './../../models/User';
import * as LoggingService from './../../../logging';
import * as UserService from './../';

describe('Users service', () => {
  describe('registering a new user', () => {
    let userModelDouble = {};
    let saveMock;

    beforeEach(() => {
      userModelDouble = { save: () => {} };

      stub(LoggingService, 'logInfo');
      stub(LoggingService, 'logError');
      stub(User, 'forge').returns(userModelDouble);
      saveMock = stub(userModelDouble, 'save').returns(Promise.resolve());

    });

    afterEach(() => {
      User.forge.restore();
      LoggingService.logError.restore();
      LoggingService.logInfo.restore();
    });

    it('logs information to the logger', (done) => {
      UserService.signup({
        firstName: 'Joe',
        lastName: 'User',
        email: 'joe@altvista.net',
        password: 'secret',
        passwordConfirmation: 'secret'
      }).then(() => {
        expect(LoggingService.logInfo).to.have.been.called;
        done();
      });
    });

    it('delegates to the #forge method on the User model', (done) => {
      UserService.signup({
        firstName: 'Joe',
        lastName: 'User',
        email: 'joe@altvista.net',
        password: 'secret',
        passwordConfirmation: 'secret'
      }).then(() => done());

      expect(User.forge).to.have.been.called;
    });

    it('attempts to save the model', (done) => {
      UserService.signup({
        firstName: 'Joe',
        lastName: 'User',
        email: 'joe@altvista.net',
        password: 'secret',
        passwordConfirmation: 'secret'
      }).then(() => {
        expect(userModelDouble.save).to.have.been.called;
        done();
      });
    });

    describe('whent he save is successful', () => {
      let saveResult = {};
      beforeEach(() => {
        saveMock.returns(Promise.resolve(saveResult));
      });

      it('resolves the user', (done) => {
        UserService.signup({
          firstName: 'Joe',
          lastName: 'User',
          email: 'joe@altvista.net',
          password: 'secret',
          passwordConfirmation: 'secret'
        }).then((result) => {
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

      it('logs an error', (done) => {
        UserService.signup({
          firstName: 'Joe',
          lastName: 'User',
          email: 'joe@altvista.net',
          password: 'secret',
          passwordConfirmation: 'secret'
        }).then(() => {}, () => {
          expect(LoggingService.logError).to.have.been.called;
          done();
        });
      });

      it('rejects an error', (done) => {
        UserService.signup({
          firstName: 'Joe',
          lastName: 'User',
          email: 'joe@altvista.net',
          password: 'secret',
          passwordConfirmation: 'secret'
        }).then(() => {}, (saveError) => {
          expect(saveError).to.equal(error);
          done();
        });
      });
    });

  });
});

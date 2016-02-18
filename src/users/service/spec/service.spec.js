import { expect } from 'chai';
import { stub, spy } from 'sinon';
import User from './../../models/User';
import * as LoggingService from './../../../logging';
import * as UserService from './../';

describe('Users service', () => {
  describe('registering a new user', () => {
    let loggerDouble = {};
    let userModelDouble = {};
    let saveMock;

    beforeEach(() => {
      userModelDouble = { save: () => {} };
      loggerDouble.info = spy();


      stub(LoggingService, 'logger').returns(loggerDouble);
      stub(User, 'forge').returns(userModelDouble);
      saveMock = stub(userModelDouble, 'save').returns(Promise.resolve());

    });

    afterEach(() => {
      User.forge.restore();
      LoggingService.logger.restore();
    });

    it('logs information to the logger', (done) => {
      UserService.signup({
        firstName: 'Joe',
        lastName: 'User',
        email: 'joe@altvista.net',
        password: 'secret',
        passwordConfirmation: 'secret'
      }).then(() => {
        expect(loggerDouble.info).to.have.been.called;
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
        loggerDouble.error = spy();
      });

      it('logs an error', (done) => {
        UserService.signup({
          firstName: 'Joe',
          lastName: 'User',
          email: 'joe@altvista.net',
          password: 'secret',
          passwordConfirmation: 'secret'
        }).then(() => {}, () => {
          expect(loggerDouble.error).to.have.been.called;
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

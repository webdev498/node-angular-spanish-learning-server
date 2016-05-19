import { expect } from 'chai';
import { stub } from 'sinon';
import * as UserService from './../../../users/service';
import * as TokenProvider from './../../../authentication/tokenProvider';
import * as LoginService from './../../service';
import AuthenticationError from './../../exceptions/AuthenticationError';
import * as LoggingService from './../../../logging';

describe('Login Service', () => {
  let userDouble, getStub, tokenProviderStub, email, password, token;

  before(() => {
    userDouble = { validatePassword: () => { }, sanitize: () => { } };
    email = 'test@test.com';
    password = 'password';
    getStub = stub(UserService, 'getByEmail');
    tokenProviderStub = stub(TokenProvider, 'sign');
    stub(LoggingService, 'logInfo');
    stub(LoggingService, 'logError');
  });

  after(() => {
    TokenProvider.sign.restore();
    UserService.getByEmail.restore();
    LoggingService.logError.restore();
    LoggingService.logInfo.restore();
  });

  describe('login in with email and password', () => {
    describe('when database operation is successful', () => {
      describe('when user is authenticated', () => {
        before(() => {
          token = '123';
          tokenProviderStub.returns(Promise.resolve("123"));
          userDouble.validatePassword = stub().returns(true);
          userDouble.sanitize = stub().returns(userDouble);
          getStub.returns(Promise.resolve(userDouble));
        });

        after(() => {
          UserService.getByEmail.reset();
          TokenProvider.sign.reset();
        });

        it('returns a token', () => LoginService.login(email, password).then((result) => { expect(result).to.equal(token); }));
      });

      describe('when user is not found by email', () => {
        before(() => {
          getStub.returns(Promise.resolve(null));
        });

        after(() => {
          UserService.getByEmail.reset();
        });

        it('raises an Authentication Error', () =>
          expect(LoginService.login(email, password)).to.be.rejectedWith(AuthenticationError));
      });

      describe('when password is wrong', () => {
        before(() => {
          getStub.returns(Promise.resolve(userDouble));
          userDouble.validatePassword = stub().returns(false);
        });

        after(() => {
          UserService.getByEmail.reset();
        });

        it('raises an Authentication Error', () =>
          expect(LoginService.login(email, password)).to.be.rejectedWith(AuthenticationError));
      });

    });
  });
});

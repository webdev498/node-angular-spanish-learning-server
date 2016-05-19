import { expect } from 'chai';
import { stub } from 'sinon';
import * as UserService from './../../../users/service';
import * as TokenProvider from './../../../authentication/tokenProvider';
import * as LoginService from './../../service';
import * as LoggingService from './../../../logging';

describe('Login Service', () => {
  let userDouble, getStub, signupStub, tokenProviderStub, strategy, profile, token;

  before(() => {
    userDouble = { sanitize: () => { } };
    strategy = 'facebook';
    profile = { name: { first: 'test', last: 'test' }, email: 'test@test.com' };
    getStub = stub(UserService, 'getByEmail');
    signupStub = stub(UserService, 'signup');
    tokenProviderStub = stub(TokenProvider, 'sign');
    stub(LoggingService, 'logInfo');
    stub(LoggingService, 'logError');
  });

  after(() => {
    TokenProvider.sign.restore();
    UserService.getByEmail.restore();
    UserService.signup.restore();
    LoggingService.logError.restore();
    LoggingService.logInfo.restore();
  });

  describe('login in with OAuth provider', () => {
    describe('when database operation is successful', () => {
      describe('when user exists in the database', () => {
        before(() => {
          token = '123';
          tokenProviderStub.returns(Promise.resolve("123"));
          userDouble.sanitize = stub().returns(userDouble);
          getStub.returns(Promise.resolve(userDouble));
        });

        after(() => {
          UserService.getByEmail.reset();
          TokenProvider.sign.reset();
        });

        it('returns a token', () => LoginService.oAuthLogin(strategy, profile).then((result) => { expect(result).to.equal(token); }));
      });

      describe('when user does not exist in database', () => {
        before(() => {
          getStub.returns(Promise.resolve(null));
          signupStub.returns(Promise.resolve(userDouble));
          userDouble.sanitize = stub().returns(userDouble);
        });

        after(() => {
          UserService.getByEmail.reset();
          UserService.signup.reset();
        });

        it('returns a token', () => LoginService.oAuthLogin(strategy, profile).then((result) => { expect(result).to.equal(token); }));
      });

    });
  });
});

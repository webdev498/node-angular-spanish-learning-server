import { stub } from 'sinon';
import {expect} from 'chai';
import GoogleProvider from './../../../security/authentication/googleProvider';
import * as TokenProvider from './../../../security/authentication/tokenProvider';
import * as LoginService from './../index.js';
import * as UserService from './../../../users/service/index.js';

describe('Login service', () => {
  describe('when logging in through Google', () => {
    const code = 'xyz123';
    const token = '123';

    const profileInfo = {
      email: 'someone@somewhere.net',
      firstName: 'Test',
      lastName: 'Test'
    };

    const googleProvider = {
      getProfile: stub().returns(Promise.resolve(profileInfo))
    };
    const user = { sanitize: () => { } };

    beforeEach(() => {
      stub(GoogleProvider, 'build').returns(googleProvider);
      stub(TokenProvider, 'sign').returns(Promise.resolve(token));
    });
    afterEach(() => {
      GoogleProvider.build.restore();
      TokenProvider.sign.restore();
      UserService.getByEmail.restore();
    });

    describe('when the user does not already exist', () => {
      beforeEach(() => {
        stub(UserService, 'getByEmail').returns(Promise.resolve(null));
        stub(UserService, 'signup').returns(Promise.resolve(user));
      });

      afterEach(() => {
        UserService.signup.restore();
      });

      it('signs up a new user with the Google profile information', () => LoginService.googleLogin(code).then(() => { expect(UserService.signup).to.be.calledWith(profileInfo); }));
      it('returns a token', () => LoginService.googleLogin(code).then((result) => { expect(result).to.equal(token); }));
    });

    describe('when user already exists', () => {
      beforeEach(() => {
        stub(UserService, 'getByEmail').returns(Promise.resolve(user));
      });

      it('returns a token', () => LoginService.googleLogin(code).then((result) => { expect(result).to.equal(token); }));
    });
  });
});

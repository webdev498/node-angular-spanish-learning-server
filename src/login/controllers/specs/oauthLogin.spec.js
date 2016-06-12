import { expect } from 'chai';
import { spy, stub } from 'sinon';
import * as LoginService from './../../service';
import * as Controller from './../';
import AuthenticationError from './../../exceptions/AuthenticationError';
import { UNAUTHORIZED } from './../../../http/statusCodes';

describe('Login Controller', () => {
  let reply, request, loginStub, response;

  before(() => {
    reply = spy();
    request = { payload: { code: 'oauthlogincode' } };
  });

  describe('login with google', () => {
    before(() => {
      loginStub = stub(LoginService, 'googleLogin');
    });

    after(() => {
      LoginService.googleLogin.restore();
    });

    describe('when google login is authenticated', () => {
      before(() => {
        response = { token: "123" };
        loginStub.returns(Promise.resolve("123"));
        return Controller.googleAuthLogin(request, reply);
      });

      after(() => {
        LoginService.googleLogin.reset();
      });

      it('delegates to the get action of the LoginService', () => expect(LoginService.googleLogin).to.have.been.called);
      it('replies with the a token', () => expect(reply).to.have.been.calledWith(response));
    });

    describe('when google login fails', () => {
      let serviceError = { statusCode: UNAUTHORIZED };
      before(() => {
        response = ({ authenticated: false });
        loginStub.returns(Promise.reject(AuthenticationError));
        reply = stub().returns(response);
        return Controller.googleAuthLogin(request, reply);
      });

      after(() => {
        LoginService.googleLogin.reset();
      });

      it('delegates to the get action of the LoginService', () => expect(LoginService.googleLogin).to.have.been.called);
      it('sets the status code on the response to Unauthorized 401', () => expect(response.statusCode).to.equal(serviceError.statusCode));
    });
  });

  describe('login with facebook', () => {
    before(() => {
      loginStub = stub(LoginService, 'facebookLogin');
    });

    after(() => {
      LoginService.facebookLogin.restore();
    });

    describe('when facebook login is authenticated', () => {
      before(() => {
        response = { token: "123" };
        loginStub.returns(Promise.resolve("123"));
        return Controller.facebookAuthLogin(request, reply);
      });

      after(() => {
        LoginService.facebookLogin.reset();
      });

      it('delegates to the get action of the LoginService', () => expect(LoginService.facebookLogin).to.have.been.called);
      it('replies with the a token', () => expect(reply).to.have.been.calledWith(response));
    });

    describe('when facebook login fails', () => {
      let serviceError = { statusCode: UNAUTHORIZED };
      before(() => {
        response = ({ authenticated: false });
        loginStub.returns(Promise.reject(AuthenticationError));
        reply = stub().returns(response);
        return Controller.facebookAuthLogin(request, reply);
      });

      after(() => {
        LoginService.facebookLogin.reset();
      });

      it('delegates to the get action of the LoginService', () => expect(LoginService.facebookLogin).to.have.been.called);
      it('sets the status code on the response to Unauthorized 401', () => expect(response.statusCode).to.equal(serviceError.statusCode));
    });
  });
});
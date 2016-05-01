import { expect } from 'chai';
import { spy, stub } from 'sinon';
import * as LoginService from './../../service';
import * as Controller from './../';
import AuthenticationError from './../../exceptions/AuthenticationError';
import { UNAUTHORIZED } from './../../../http/statusCodes';

describe('Login controller', () => {
  let reply, request, loginStub, response;

  before(() => {
    reply = spy();
    loginStub = stub(LoginService, 'oAuthLogin');
  });

  after(() => {
    LoginService.oAuthLogin.restore();
  });

  describe('login in with oauth provider', () => {
    describe('when user is authenticated', () => {
      before(() => {
        request = { auth: { isAuthenticated: true, credentials: { profile: {} } } };
        response = { token: "123" };
        loginStub.returns(Promise.resolve("123"));
        return Controller.oAuthLogin(request, reply);
      });

      after(() => {
        LoginService.oAuthLogin.reset();
      });

      it('delegates to the get action of the LoginService', () => expect(LoginService.oAuthLogin).to.have.been.called);
      it('replies with the a token', () => expect(reply).to.have.been.calledWith(response));
    });

    describe('when user authentication fails', () => {
      let serviceError = { statusCode: UNAUTHORIZED };
      before(() => {
        request = { auth: { isAuthenticated: false, credentials: { profile: {} } } };
        response = ({ authenticated: false });
        reply = stub().returns(response);
        return Controller.oAuthLogin(request, reply);
      });
      
      it('sets the status code on the response to Unauthorized 401', () => expect(response.statusCode).to.equal(serviceError.statusCode));
    })
  });
});

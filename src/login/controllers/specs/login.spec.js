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
    request = { payload: { email: 'test@test.com', password: 'test' } };
    loginStub = stub(LoginService, 'login');
  });

  after(() => {
    LoginService.login.restore();
  });

  describe('login in with email and password', () => {
    describe('when user is authenticated', () => {
      before(() => {
        response = { token: "123" };
        loginStub.returns(Promise.resolve("123"));
        return Controller.login(request, reply);
      });

      after(() => {
        LoginService.login.reset();
      });

      it('delegates to the get action of the LoginService', () => expect(LoginService.login).to.have.been.called);
      it('replies with the a token', () => expect(reply).to.have.been.calledWith(response));
    });

    describe('when user authentication fails', () => {
      let serviceError = { statusCode: UNAUTHORIZED };
      before(() => {
        response = ({ authenticated: false });
        loginStub.returns(Promise.reject(AuthenticationError));
        reply = stub().returns(response);
        return Controller.login(request, reply);
      });

      after(() => {
        LoginService.login.reset();
      });

      it('delegates to the get action of the LoginService', () => expect(LoginService.login).to.have.been.called);
      it('sets the status code on the response to Unauthorized 401', () => expect(response.statusCode).to.equal(serviceError.statusCode));
    });
  });
});

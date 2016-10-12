import { spy, stub } from 'sinon';
import LoginService from '../../service/LoginService';
import LoginController from '../LoginController';
import AuthenticationError from './../../exceptions/AuthenticationError';
import { UNAUTHORIZED } from 'cgihttp/statusCodes';

describe('Login Controller', () => {
  const request = { payload: { code: 'oauthlogincode' } };

  describe('login with google', () => {
    describe('when google login is authenticated', () => {
      const service = new LoginService();
      const controller = new LoginController(service);
      const reply = spy();
      const response = { token: "123" };

      before(async () => {
        stub(service, 'googleLogin').returns(Promise.resolve("123"));
        await controller.googleAuthLogin(request, reply);
      });

      it('replies with the a token', () => {
        expect(reply).to.have.been.calledWith(response);
      });
    });

    describe('when google login fails', () => {
      const serviceError = { statusCode: UNAUTHORIZED };
      const service = new LoginService();
      const controller = new LoginController(service);
      const response = ({ authenticated: false });
      const reply = stub().returns(response);

      before(async () => {
        stub(service, 'googleLogin').returns(Promise.reject(AuthenticationError));
        await controller.googleAuthLogin(request, reply);
      });

      it('sets the status code on the response to Unauthorized 401', () => {
        expect(response.statusCode).to.equal(serviceError.statusCode);
      });
    });
  });

  describe('login with facebook', () => {
    describe('when facebook login is authenticated', () => {
      const service = new LoginService();
      const controller = new LoginController(service);
      const response = { token: "123" };
      const reply = stub().returns(response);

      before(async () => {
        stub(service, 'facebookLogin').returns(Promise.resolve("123"));
        await controller.facebookAuthLogin(request, reply);
      });

      it('replies with the a token', () => {
        expect(reply).to.have.been.calledWith(response);
      });
    });

    describe('when facebook login fails', () => {
      const serviceError = { statusCode: UNAUTHORIZED };
      const service = new LoginService();
      const controller = new LoginController(service);
      const response = ({ authenticated: false });
      const reply = stub().returns(response);
      before(() => {
        stub(service, 'facebookLogin').returns(Promise.reject(AuthenticationError));
        return controller.facebookAuthLogin(request, reply);
      });

      it('sets the status code on the response to Unauthorized 401', () => {
        expect(response.statusCode).to.equal(serviceError.statusCode);
      });
    });
  });
});

import { spy, stub } from 'sinon';
import LoginService from '../../service/LoginService';
import LoginController from '../LoginController';
import AuthenticationError from './../../exceptions/AuthenticationError';
import { UNAUTHORIZED } from 'http/statusCodes';

describe('Login controller', () => {
  let response;
  const request = { payload: { email: 'test@test.com', password: 'test' } };

  describe('login in with email and password', () => {
    describe('when user is authenticated', () => {
      const service = new LoginService();
      const controller = new LoginController(service);
      const reply = spy();

      before(() => {
        response = { token: "123" };
        stub(service, 'login').returns(Promise.resolve('123'));
        return controller.login(request, reply);
      });


      it('delegates to the get action of the LoginService', () => {
        expect(service.login).to.have.been.called;
      });

      it('replies with the a token', () => {
        expect(reply).to.have.been.calledWith(response);
      });
    });

    describe('when user authentication fails', () => {
      const serviceError = { statusCode: UNAUTHORIZED };
      const service = new LoginService();
      const controller = new LoginController(service);
      const reply = stub();
      const response = ({ authenticated: false });

      before(() => {
        reply.returns(response);
        stub(service, 'login').returns(Promise.reject(AuthenticationError));
        return controller.login(request, reply);
      });

      it('delegates to the get action of the LoginService', () => {
        expect(service.login).to.have.been.called;
      });

      it('sets the status code on the response to Unauthorized 401', () => {
        expect(response.statusCode).to.equal(serviceError.statusCode);
      });
    });
  });
});

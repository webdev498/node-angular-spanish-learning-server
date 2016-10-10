import { stub } from 'sinon';
import UserService from 'users/service/UserService';
import TokenProvider from 'security/authentication/TokenProvider';
import UsersController from 'users/controllers/UsersController';
import * as EmailMessage from 'email';
import CRMService from 'users/service/CRMService';

describe('User controller', () => {
  const token = '123abc';
  const request = { payload: {firstName: 'fn', lastName: 'ln', password:'pwd', confirmPassword: 'cpwd', email:'abc@abc.com'} };
  const userDouble = {sanitize: () => {}};

  describe('signing up a new user', () => {
    describe('when signup is successful', () => {
      const reply = stub().returns({});
      const sanitizedUser = {};
      const tokenProvider = new TokenProvider();
      const service = new UserService();
      const controller = new UsersController(service, tokenProvider);

      before(async () => {
        stub(service, 'signup').returns(Promise.resolve(userDouble));
        stub(userDouble, 'sanitize').returns(sanitizedUser);
        stub(tokenProvider, 'sign').returns(Promise.resolve(token));
        stub(EmailMessage, 'signupConfirmation').returns(Promise.resolve());
        stub(CRMService, 'syncWithCRM').returns(null);
        await controller.create(request, reply);
      });

      it('delegates to the signup action of the UserService', () => {
        expect(service.signup).to.have.been.called;
      });

      it('passes the user to the token service to be signed', () => {
        expect(tokenProvider.sign).to.have.been.calledWith(sanitizedUser);
      });

      it('invokes the reply method provided by the route with a JWT token representing the user', () => {
        expect(reply).to.have.been.calledWith({ token });
      });
    });

    describe('when the signup is not successful', () => {
      const tokenProvider = new TokenProvider();
      const service = new UserService();
      const controller = new UsersController(service, tokenProvider);
      const error = new Error();
      const reply = stub().returns({});

      before(async () => {
        stub(tokenProvider, 'sign');
        stub(service, 'signup').returns(Promise.reject(error));
        await controller.create(request, reply);
      });


      it('does not delegate to the token provider', () => {
        expect(tokenProvider.sign).not.to.have.been.called;
      });

      it('invokes the reply method provided by the router with the error', () => {
        expect(reply).to.have.been.calledWith(error);
      });
    });

  });
});

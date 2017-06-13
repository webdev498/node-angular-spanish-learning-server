import { stub } from 'sinon';
import UserService from 'users/service/UserService';
import UsersController from 'users/controllers/UsersController';
import * as EmailMessage from 'email';
import { NO_CONTENT } from 'http/status-codes';

describe('User controller', () => {
  const request = { payload: {email: 'abc@abc.com'} };
  const payload = { email: 'abc@abc.com' };
  const user = { };

  describe('user resets password from forgot password link', () => {
    describe('when operation is successful', () => {
      const service = new UserService();
      const controller = new UsersController(service);
      let response = {};
      let reply = stub().returns(response);

      before(async () => {
        stub(service, 'resetPassword').returns(Promise.resolve(payload));
        stub(EmailMessage, 'resetPassword').returns(Promise.resolve(user));
        await controller.resetPassword(request, reply);
      });

      it('sets the status code of the reply to no content', () => {
        expect(response.statusCode).to.equal(NO_CONTENT);
      });
    });

    describe('when the resetPassword is not successful', () => {
      const service = new UserService();
      const controller = new UsersController(service);
      const error = new Error();
      const reply = stub().returns({});

      before(async () => {
        stub(service, 'resetPassword').returns(Promise.reject(error));
        await controller.resetPassword(request, reply);
      });

      it('invokes the reply method provided by the router with the error', () => {
        expect(reply).to.have.been.calledWith(error);
      });
    });
  });
});

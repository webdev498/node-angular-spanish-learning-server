import { stub } from 'sinon';
import UserService from 'users/service/UserService';
import UsersController from 'users/controllers/UsersController';
import { NO_CONTENT } from 'http/status-codes';

describe('User controller', () => {
  const request = {
    payload: { newPassword:'abc'},
    params: {id: '2903'}
  };

  describe('user updates their password after it was reset', () => {
    describe('when operation is successful', () => {
      const service = new UserService();
      const controller = new UsersController(service);
      let response = {};
      let reply = stub().returns(response);

      before(async () => {
        stub(service, 'updatePasswordFromReset').returns(Promise.resolve());
        await controller.updatePassword(request, reply);
      });

      it('sets the status code of the reply to created', () => {
        expect(response.statusCode).to.equal(NO_CONTENT);
      });
    });

    describe('when the updatePassword is not successful', () => {
      const service = new UserService();
      const controller = new UsersController(service);
      const error = new Error();
      const reply = stub().returns({});

      before(async () => {
        stub(service, 'updatePasswordFromReset').returns(Promise.reject(error));
        await controller.updatePassword(request, reply);
      });

      it('invokes the reply method provided by the router with the error', () => {
        expect(reply).to.have.been.calledWith(error);
      });
    });
  });
});

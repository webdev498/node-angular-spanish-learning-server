import { spy, stub } from 'sinon';
import UserService from 'users/service/UserService';
import UsersController from 'users/controllers/UsersController';

describe('User controller', () => {
  const request = {
    payload: { email:'abc@abc.com'},
    params: {id: '2903'}
  };
  const userDouble = {};

  describe('updating an existing user', () => {
    describe('when update is successful', () => {
      const reply = spy();
      const service = new UserService();
      const controller = new UsersController(service);

      before(async () => {
        stub(service, 'update').returns(Promise.resolve(userDouble));
        await controller.update(request, reply);
      });

      it('replies with the saved user', () => {
        expect(reply).to.have.been.calledWith(userDouble);
      });
    });

    describe('when the update is not successful', () => {
      const reply = stub().returns({});
      const error = new Error();
      const service = new UserService();
      const controller = new UsersController(service);

      before(async () => {
        stub(service, 'update').returns(Promise.reject(error));
        await controller.update(request, reply);
      });

      it('invokes the reply method provided by the router with the error', () => {
        expect(reply).to.have.been.calledWith(error);
      });
    });
  });
});

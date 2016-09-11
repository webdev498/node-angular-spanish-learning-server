import { spy, stub } from 'sinon';
import UserService from 'users/service/UserService';
import UsersController from 'users/controllers/UsersController';

describe('User controller', () => {
  const request = { id: '1' };
  const userDouble = { id: '1' };

  describe('fetching a specific user', () => {
    describe('when database operation is successful', () => {
      const reply = spy();
      const service = new UserService();
      const controller = new UsersController(service);

      before(async () => {
        stub(service, 'get').returns(Promise.resolve(userDouble));
        await controller.get(request, reply);
      });

      it('replies with the user requested', () => {
        expect(reply).to.have.been.calledWith(userDouble);
      });
    });

    describe('when the get is not successful', () => {
      const service = new UserService();
      const controller = new UsersController(service);
      const error = new Error();
      const reply = stub().returns({});

      before(async () => {
        stub(service, 'get').returns(Promise.reject(error));
        await controller.get(request, reply);
      });

      it('invokes the reply method provided by the router with the error', () => {
        expect(reply).to.have.been.calledWith(error);
      });
    });
  });
});

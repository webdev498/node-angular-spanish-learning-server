import { expect } from 'chai';
import { spy, stub } from 'sinon';
import UserService from 'users/service/UserService';
import TokenProvider from 'security/authentication/TokenProvider';
import UsersController from 'users/controllers/UsersController';


describe('User controller', () => {
  describe('fetching all of the users', () => {
    let request, reply;

    describe('when the database operation was successful', () => {
      let users = [{}, {}];
      reply = spy();

      const service = new UserService();
      const tokenProvider = new TokenProvider();
      const controller = new UsersController(service, tokenProvider);

      before(async () => {
        stub(service, 'all').returns(Promise.resolve(users));
        await controller.list(request, reply);
      });

      it('replies with the collection of users', () => {
        expect(reply).to.have.been.calledWith(users);
      });
    });

    describe('when the database operation was not successful', () => {
      const runtimeError = {};
      const response = {};
      const reply = stub().returns(response);

      const service = new UserService();
      const tokenProvider = new TokenProvider();
      const controller = new UsersController(service, tokenProvider);

      before(() => {
        stub(service, 'all').returns(Promise.reject(runtimeError));
        return controller.list(request, reply);
      });

      it('replies with the error', () => {
        expect(reply).to.have.been.calledWith(runtimeError);
      });
    });
  });
});

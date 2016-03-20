import { expect } from 'chai';
import { spy, stub } from 'sinon';
import * as UserService from './../../service';
import * as ServiceErrorFactory from './../../../exceptions/Factory';
import * as Controller from './../';


describe('User controller', () => {
  describe('fetching all of the users', () => {
    let request, reply;

    describe('when the database operation was successful', () => {
      let users = [{}, {}];
      reply = spy();

      beforeEach(() => {
        stub(UserService, 'all').returns(Promise.resolve(users));
        return Controller.list(request, reply);
      });
      afterEach(() => {
        UserService.all.restore();
      });

      it('replies with the collection of users', () => expect(reply).to.have.been.calledWith(users));
    });

    describe('when the database operation was successful', () => {
      let serviceError = { statusCode: 401 };
      let runtimeError = {};
      let response = {};
      reply = stub().returns(response);

      beforeEach(() => {
        stub(UserService, 'all').returns(Promise.reject(runtimeError));
        stub(ServiceErrorFactory, 'create').returns(serviceError);
        return Controller.list(request, reply);
      });
      afterEach(() => {
        UserService.all.restore();
        ServiceErrorFactory.create.restore();
      });

      it('replies with the error', () => expect(reply).to.have.been.calledWith(serviceError));
      it('sets the status code on the response to the status code of the error', () => expect(response.statusCode).to.equal(serviceError.statusCode));
      it('creates a service error from the error returned from the Users Service', () => expect(ServiceErrorFactory.create).to.have.been.calledWith(request, runtimeError));
    });
  });
});

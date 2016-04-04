import { expect } from 'chai';
import { spy, stub } from 'sinon';
import * as UserService from './../../service';
import * as ServiceErrorFactory from './../../../exceptions/Factory';
import * as Controller from './../';
import { OK } from './../../../http/statusCodes';

describe('User controller', () => {
  let reply, request, userDouble, updateStub;

  before(() => {
    reply = spy();
    request = { payload: { email:'abc@abc.com'} };
    userDouble = {};
    updateStub = stub(UserService, 'update');
  });

  after(() => {
    UserService.update.restore();
  });

  describe('updating an existing user', () => {
    describe('when update is successful', () => {

      before(() => {
        updateStub.returns(Promise.resolve(userDouble));
        return Controller.update(request, reply);
      });

      after(() => {
        UserService.update.reset();
      });

      it('delegates to the update action of the UserService', () => expect(UserService.update).to.have.been.called);
      it('replies with the saved user', () => expect(reply).to.have.been.calledWith(userDouble));
    });

    describe('when the update is not successful', () => {
      let error;
      before(() => {
        reply = stub().returns({});
        error = { statusCode: OK };
        stub(ServiceErrorFactory, 'create').returns(error);
        updateStub.returns(Promise.reject({}));
        return Controller.update(request, reply);
      });

      after(() => {
          UserService.update.reset();
          ServiceErrorFactory.create.restore();
      });

      it('invokes the reply method provided by the router with the error', () => {
        expect(reply).to.have.been.calledWith(error);
      });

    });
  });
});

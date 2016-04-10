import { expect } from 'chai';
import { spy, stub } from 'sinon';
import * as UserService from './../../service';
import * as ServiceErrorFactory from './../../../exceptions/Factory';
import * as Controller from './../';
import { OK } from './../../../http/statusCodes';

describe('User controller', () => {
  let reply, request, userDouble, getStub;

  before(() => {
    reply = spy();
    request = { id: '1' };
    userDouble = { id: '1' };
    getStub = stub(UserService, 'get');
  });

  after(() => {
    UserService.get.restore();
  });

  describe('fetching a specific user', () => {
    describe('when database operation is successful', () => {

      before(() => {
        getStub.returns(Promise.resolve(userDouble));
        return Controller.get(request, reply);
      });

      after(() => {
        UserService.get.reset();
      });

      it('delegates to the get action of the UserService', () => expect(UserService.get).to.have.been.called);
      it('replies with the user requested', () => expect(reply).to.have.been.calledWith(userDouble));
    });

    describe('when the get is not successful', () => {
      let error;
      before(() => {
        reply = stub().returns({});
        error = { statusCode: OK };
        stub(ServiceErrorFactory, 'create').returns(error);
        getStub.returns(Promise.reject({}));
        return Controller.get(request, reply);
      });

      after(() => {
        UserService.get.reset();
        ServiceErrorFactory.create.restore();
      });

      it('invokes the reply method provided by the router with the error', () => {
        expect(reply).to.have.been.calledWith(error);
      });

    });
  });
});

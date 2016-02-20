import { expect } from 'chai';
import { stub } from 'sinon';
import * as ChoiceService from './../../service';
import * as Controller from './../';
import { OK } from './../../../http/statusCodes';
import * as ServiceErrorFactory from './../../../exceptions/Factory';


describe('when updating an existing Choice', () => {
  let serviceStub,
      request = {},
      response,
      reply;

  before(() => {
    serviceStub = stub(ChoiceService, 'update');
    reply = stub();
    request.params = {};
  });

  after(() => {
    ChoiceService.update.restore();
  });

  it('calls update on the choice service', () => {
    serviceStub.returns(Promise.resolve());
    Controller.update(request, reply);
    expect(ChoiceService.update).to.have.been.called;
  });

  describe('when the update was successful', () => {

    before(() => {
      response = {};
      reply.returns(response);
      serviceStub.returns(Promise.resolve());
    });

    after(() => {
      response = null;
    });

    it('replies with an empty payload', () => {
      Controller.update(request, reply);
      expect(reply).to.have.been.called;
    });

    it('sets the stats code on the response to 200', () => {
      Controller.update(request, reply);
      expect(response.statusCode).to.eq(OK);
    });

  });

  describe('when the update was not sucessful', () => {
    let error;

    before(() => {
      error = new Error();
      serviceStub.returns(Promise.reject(error));
      stub(ServiceErrorFactory, 'create').returns(error);
      Controller.update(request, reply);
    });

    afterEach(() => {
      ServiceErrorFactory.create.restore();
    });

    it('invokes the reply method provided by the router with the error', () => {
      expect(reply).to.have.been.calledWith(error);
    });

  });
});

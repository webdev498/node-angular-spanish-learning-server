import { expect } from 'chai';
import { spy, stub } from 'sinon';
import * as ChoiceService from './../../service';
import * as Controller from './../';
import * as ServiceErrorFactory from './../../../exceptions/Factory';

describe('Choice controller actions', () => {
  let reply, request, choiceDouble, error;

  before(() => {
    reply = spy();
    request = { payload: { text: 'Scapula'} };
    choiceDouble = {};
  });


  describe('when creating a new Choice', () => {
    let createStub;

    before(() => {
      createStub = stub(ChoiceService, 'create');
    });

    after(() => {
      ChoiceService.create.restore();
    });

    describe('and the create is successful', () => {

      before(() => {
        ChoiceService.create.reset();
        createStub.returns(Promise.resolve(choiceDouble));
        Controller.create(request, reply);
      });

      it('delegates to the create action of the ChoiceService', () => {
        expect(ChoiceService.create).to.have.been.called;
      });

      it('invokes the reply method with the newly created choice', () => {
        expect(reply).to.have.been.calledWith(choiceDouble);
      });

    });

    describe('when the create is not successful', () => {

      before(() => {
        ChoiceService.create.reset();
        error = new Error();
        createStub.returns(Promise.reject(error));
        stub(ServiceErrorFactory, 'create').returns(error);
        Controller.create(request, reply);
      });

      afterEach(() => {
        ServiceErrorFactory.create.restore();
      });

      it('invokes the reply method provided by the router with the error', () => {
        expect(reply).to.have.been.calledWith(error);
      });

    });
  });
});

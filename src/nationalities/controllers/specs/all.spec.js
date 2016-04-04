import { expect } from 'chai';
import { spy, stub } from 'sinon';
import * as NationalityService from './../../service';
import * as ServiceErrorFactory from './../../../exceptions/Factory';
import * as Controller from './../';


describe('Nationality controller', () => {
  describe('fetching all of the nationalities', () => {
    let request, reply;

    describe('when the database operation was successful', () => {
      let nationalities = [{}, {}];
      reply = spy();

      beforeEach(() => {
        stub(NationalityService, 'all').returns(Promise.resolve(nationalities));
        return Controller.list(request, reply);
      });
      afterEach(() => {
        NationalityService.all.restore();
      });

      it('replies with the collection of nationalities', () => expect(reply).to.have.been.calledWith(nationalities));
    });

    describe('when the database operation was successful', () => {
      let serviceError = { statusCode: 401 };
      let runtimeError = {};
      let response = {};
      reply = stub().returns(response);

      beforeEach(() => {
        stub(NationalityService, 'all').returns(Promise.reject(runtimeError));
        stub(ServiceErrorFactory, 'create').returns(serviceError);
        return Controller.list(request, reply);
      });
      afterEach(() => {
        NationalityService.all.restore();
        ServiceErrorFactory.create.restore();
      });

      it('replies with the error', () => expect(reply).to.have.been.calledWith(serviceError));
      it('sets the status code on the response to the status code of the error', () => expect(response.statusCode).to.equal(serviceError.statusCode));
      it('creates a service error from the error returned from the Users Service', () => expect(ServiceErrorFactory.create).to.have.been.calledWith(request, runtimeError));
    });
  });
});

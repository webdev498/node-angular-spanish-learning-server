import { stub } from 'sinon';
import { expect } from 'chai';

import * as Controller from './../';
import * as CategoryService from './../../service';
import * as ServiceErrorFactory from './../../../exceptions/Factory';
import { OK } from './../../../http/statusCodes';

describe('Updating an existing category', () => {
  let response = {};
  let request = { params: { id: '23asd-asdae3ads-asd2eadw'}, payload: { name: "Instruments"} };
  let category = {};

  describe('when the Categories service returns an error', () => {
    let error = { statusCode: 404 };
    let reply = stub().returns(response);

    beforeEach(() => {
      stub(CategoryService, 'update').returns(Promise.reject({}));
      stub(ServiceErrorFactory, 'create').returns(error);
      return Controller.update(request, reply);
    });

    afterEach(() => {
      CategoryService.update.restore();
      ServiceErrorFactory.create.restore();
    });

    it('replies with a service error', () => {
      expect(reply).to.have.been.calledWith(error);
    });

    it('sets the status code of the response to be the status code of the service error', () => {
      expect(response.statusCode).to.equal(error.statusCode);
    });
  });

  describe('when the Categories service resolves successfully', () => {
    let reply = stub().returns(response);

    beforeEach(() => {
      stub(CategoryService, 'update').returns(Promise.resolve(category));
      return Controller.update(request, reply);
    });

    afterEach(() => {
      CategoryService.update.restore();
    });

    it('replies with the updated model', () => {
      expect(reply).to.have.been.calledWith(category);
    });

    it('sets the status code of the response to be HTTP NO CONTENT', () => {
      expect(response.statusCode).to.equal(OK);
    });
  });
});

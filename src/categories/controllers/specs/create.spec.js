import { stub } from 'sinon';
import { expect } from 'chai';

import * as Controller from './../';
import * as CategoryService from './../../service';
import * as ServiceErrorFactory from './../../../exceptions/Factory';
import { CREATED } from './../../../http/statusCodes';

describe('creating a new category', () => {
  let response = {};
  let request = { payload: { name: 'A Category'}};

  describe('when the Categories service returns an error', () => {
    let error = { statusCode: 404 };
    let reply = stub().returns(response);

    beforeEach((done) => {
      stub(CategoryService, 'create').returns(Promise.reject({}));
      stub(ServiceErrorFactory, 'create').returns(error);
      Controller.create(request, reply).then(() => done());
    });

    afterEach(() => {
      CategoryService.create.restore();
      ServiceErrorFactory.create.restore();
    });

    it('replies with a service error', () => {
      expect(reply).to.have.been.calledWith(error);
    });

    it('sets the status code of the response to be the status code of the service error', () => {
      expect(response.statusCode).to.equal(error.statusCode);
    });
  });

  describe('when the Categories service returns a collection of categories', () => {
    let reply = stub().returns(response);
    let categories = [];

    beforeEach((done) => {
      stub(CategoryService, 'create').returns(Promise.resolve(categories));
      Controller.create(request, reply).then(() => done());
    });

    afterEach(() => {
      CategoryService.create.restore();
    });

    it('replies with those categories', () => {
      expect(reply).to.have.been.calledWith(categories);
    });

    it('sets the status code of the response to be 201', () => {
      expect(response.statusCode).to.equal(CREATED);
    });
  });
});

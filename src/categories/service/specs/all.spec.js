import Category from './../../models/Category';
import * as CategoryService from './../';
import * as LoggingService from './../../../logging';
import { stub } from 'sinon';
import { expect } from 'chai';

describe('Category service', () => {
  describe('fetching all categories', () => {
    let categories = [];
    let query = {};

    beforeEach(() => {
      query.fetchAll = stub().returns(Promise.resolve(categories));
      stub(LoggingService, 'logInfo');
      stub(LoggingService, 'logError');
      stub(Category, 'where').returns(query);
    });

    afterEach(() => {
      LoggingService.logInfo.restore();
      LoggingService.logError.restore();
      Category.where.restore();
    });

    it('fetches all of the Categories from the ORM', () => {
      return CategoryService.all().then(() => expect(Category.where).to.have.been.called);
    });

    describe('if the fetch is successful', () => {
      it('resolves a collection of models', () => {
        return CategoryService.all().then((categoryCollection) => {
          expect(categoryCollection).to.equal(categories);
        });
      });
    });

    describe('if the save was not successful', () => {
      let error = {};
      let noop = () => {};
      beforeEach(() => {
        query.fetchAll = stub().returns(Promise.reject(error));
      });
      it('resolves an error', () => {
        return CategoryService.all().then(noop, (exception) => {
          expect(exception).to.equal(error);
        });
      });
    });
  });
});

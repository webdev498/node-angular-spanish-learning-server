import Category from './../../models/Category';
import CategoryService from 'categories/service/CategoryService';
import { stub } from 'sinon';
import { expect } from 'chai';

describe('Category service', () => {
  describe('fetching all categories', () => {
    let categories = [];
    let query = {};

    beforeEach(() => {
      query.fetchAll = stub().returns(Promise.resolve(categories));
      stub(Category, 'where').returns(query);
    });

    afterEach(() => Category.where.restore());

    it('fetches all of the Categories from the ORM', async () => {
      await CategoryService.all();
      expect(Category.where).to.have.been.called;
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

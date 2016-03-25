import Category from './../../models/Category';
import * as CategoryService from './../';
import * as LoggingService from './../../../logging';
import { stub, spy } from 'sinon';
import { expect } from 'chai';

describe('Category service', () => {
  describe('creating a new Category', () => {
    let categoryModel = {};
    let name = "Science";

    beforeEach(() => {
      categoryModel.get = spy();
      categoryModel.save = stub().returns(Promise.resolve(categoryModel));
      stub(LoggingService, 'logInfo');
      stub(LoggingService, 'logError');
      stub(Category, 'forge').returns(categoryModel);
    });

    afterEach(() => {
      LoggingService.logInfo.restore();
      LoggingService.logError.restore();
      Category.forge.restore();
    });

    it('forges a new model from the name provided', () => {
      return CategoryService.create({ name }).then(() => expect(Category.forge).to.have.been.calledWith({ name }));
    });

    describe('if the save is successful', () => {
      it('resolves the newly saved model', () => {
        return CategoryService.create({ name }).then(category => {
          expect(category).to.equal(categoryModel);
        });
      });
    });

    describe('if the save was not successful', () => {
      let error = {};
      let noop = () => {};
      beforeEach(() => {
        categoryModel.save = stub().returns(Promise.reject(error));
      });
      it('resolves an error', () => {
        return CategoryService.create({ name }).then(noop, exception => {
          expect(exception).to.equal(error);
        });
      });
    });
  });
});

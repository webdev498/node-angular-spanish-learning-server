import Category from './../../models/Category';
import * as CategoryService from './../';
import * as LoggingService from './../../../logging';
import { stub } from 'sinon';
import { expect } from 'chai';

describe('Category service', () => {
  describe('deleting a Category', () => {
    const id = 1;
    let categoryModel = { id };

    beforeEach(() => {
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
      return CategoryService.remove({ id }).then(() => expect(Category.forge).to.have.been.calledWith({ id }));
    });

    describe('if the save is successful', () => {
      it('resolves the newly saved model', () => {
        return CategoryService.remove({ id }).then(category => {
          expect(category).to.equal(categoryModel);
        });
      });

      it('passes {active: false} to the save method', () => {
        return CategoryService.remove({ id }).then(() => {
          expect(categoryModel.save).to.have.been.calledWith({ active: false });
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
        return CategoryService.remove({ id }).then(noop, exception => {
          expect(exception).to.equal(error);
        });
      });
    });
  });
});

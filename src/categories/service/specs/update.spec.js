import Category from './../../models/Category';
import * as CategoryService from './../';
import * as LoggingService from './../../../logging';
import { stub } from 'sinon';
import { expect } from 'chai';

describe('Category service', () => {
  describe('updating a Category', () => {
    const id = 1;
    const name = "Instruments";

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
      return CategoryService.update({ id, name }).then(() => expect(Category.forge).to.have.been.calledWith({ id }));
    });

    describe('if the save is successful', () => {
      it('resolves the updated model', () => {
        return CategoryService.update({ id, name }).then(category => {
          expect(category).to.equal(categoryModel);
        });
      });

      it('passes the new name to the save method', () => {
        return CategoryService.update({ id, name }).then(() => {
          expect(categoryModel.save).to.have.been.calledWith({ name });
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
        return CategoryService.update({ id, name }).then(noop, exception => {
          expect(exception).to.equal(error);
        });
      });
    });
  });
});

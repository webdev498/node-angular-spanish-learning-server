import { expect } from 'chai';
import { stub } from 'sinon';
import * as validations from './../../validations';
import Category from '../Category';

let attributes = {
  "name": 'Medications'
};

describe('Category data model', () => {


  describe('serializing to JSON', () => {
    let result;
    before(() => {
      result = new Category(attributes).serialize();
    });

    it('returns back and object containing only the id, name, and parentId', () => {
      const { id, name, parentId, createdAt, updatedAt } = attributes;
      expect(result).to.eql({ id, name, parentId, createdAt, updatedAt });
    });
  });

  describe('validation', () => {
    let category;

    before(() => {
      category = new Category();
      stub(validations, 'Name');
      category.validate();
    });

    after(() => {
      validations.Name.restore();
    });

    it('validates the text attribute', () => {
      expect(validations.Name).to.have.been.calledWith(category.attributes);
    });

  });

});

import { expect } from 'chai';
import { stub, spy } from 'sinon';

import knex from 'knex';
import bookshelf from 'bookshelf';
import mockKnex from 'mock-knex';
import * as validations from './../../validations';
import * as Orm from '../../../data/orm';

let attributes = {
  "name": 'Medications'
};

let pascalCaseAttributes = {
  "name": 'Medications'
};

let snakeCaseAttributes = {
  "name": 'Medications'
};

describe('Category data model', () => {

  let connection, Category;

  before(() => {
    connection = knex({
      client: 'sqlite3',
      connection: {filename: ':memory:'}
    });

    mockKnex.mock(connection);
    stub(Orm, 'getORM').returns(bookshelf(connection));
    Category = require('../Category');
  });

  after(() => {
    mockKnex.unmock(connection);
    Orm.getORM.restore();
  });

  describe("formatting a model's attribute for persistence", () => {
    let result;
    before(() => {
      result = new Category().format(attributes);
    });

    it('converts the attributes from pascal case to snake case', () => {
      expect(result).to.eql(snakeCaseAttributes);
    });

  });

  describe('parsing result sets from the database', () => {
    let result;

    before(() => {
      result = new Category().parse(snakeCaseAttributes);
    });

    it('converts snake case to pascal case', () => {
      expect(result).to.eql(pascalCaseAttributes);
    });
  });

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

  describe("a model's uuid", () => {
    let category;

    describe("when the model hasn't been saved", () => {
      before(() => {
        category = new Category();
        category.setUUID();
      });

      it('generates a id', () => {
        expect(category.get('id')).to.be.defined;
      });

    });

    describe('when the model has been saved', () => {
      before(() => {
        category = new Category();
        category.isNew = false;
        category.setUUID();
      });

      it('does not generate a uuid', () => {
        expect(category.get('id')).to.be.undefined;
      });
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

  describe('before the model is saved', () => {
    let category;

    before(() => {
      category = new Category();
      category.setUUID = spy();
      category.validate = spy();
      category.trigger('saving');
    });

    it("sets the models id", () => {
      expect(category.setUUID).to.have.been.called;
    });

    it('validates the models attributes', () => {
      expect(category.validate).to.have.been.called;
    });

  });

});

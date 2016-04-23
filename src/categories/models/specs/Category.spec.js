import { expect } from 'chai';
import { stub } from 'sinon';

import knex from 'knex';
import bookshelf from 'bookshelf';
import mockKnex from 'mock-knex';
import * as validations from './../../validations';
import * as Orm from '../../../data/orm';
import Category from '../Category';

let attributes = {
  "name": 'Medications'
};

describe('Category data model', () => {

  let connection;

  before(() => {
    connection = knex({
      client: 'sqlite3',
      connection: {filename: ':memory:'},
      useNullAsDefault: true
    });

    mockKnex.mock(connection);
    stub(Orm, 'getORM').returns(bookshelf(connection));
  });

  after(() => {
    mockKnex.unmock(connection);
    Orm.getORM.restore();
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

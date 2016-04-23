import { expect } from 'chai';
import { stub } from 'sinon';

import knex from 'knex';
import bookshelf from 'bookshelf';
import mockKnex from 'mock-knex';
import * as validations from './../../validations';
import * as Orm from '../../../data/orm';
import Choice from '../Choice';

let attributes = {
  "text": 'Who is the queen of England?',
  "version": 1
};


describe('Choice data model', () => {

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
      result = new Choice(attributes).serialize();
    });

    it('returns back and object containing only the id, text, version, translation, phase, active, createdAt, updateAt', () => {
      const { id, text, version, translation, phase, active, createdAt, updatedAt } = attributes;
      const { relations } = result;
      expect(result).to.eql({ id, text, version, translation, phase, relations, active, createdAt, updatedAt });
    });
  });

  describe('validation', () => {
    let choice;

    before(() => {
      choice = new Choice();
      stub(validations, 'Text');
      choice.validate();
    });

    after(() => {
      validations.Text.restore();
    });

    it('validates the text attribute', () => {
      expect(validations.Text).to.have.been.calledWith(choice.attributes);
    });

  });

});

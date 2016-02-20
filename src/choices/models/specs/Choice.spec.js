import { expect } from 'chai';
import { stub, spy } from 'sinon';

import knex from 'knex';
import bookshelf from 'bookshelf';
import mockKnex from 'mock-knex';
import * as validations from './../../validations';
import * as Orm from '../../../data/orm';

let attributes = {
  "text": 'Who is the queen of England?',
  "version": 1
};

let pascalCaseAttributes = {
  "text": 'Who is the queen of England?',
  "version": 1
};

let snakeCaseAttributes = {
  "text": 'Who is the queen of England?',
  "version": 1
};

describe('Choice data model', () => {

  let connection, Choice;

  before(() => {
    connection = knex({
      client: 'sqlite3',
      connection: {filename: ':memory:'}
    });

    mockKnex.mock(connection);
    stub(Orm, 'getORM').returns(bookshelf(connection));
    Choice = require('../Choice');
  });

  after(() => {
    mockKnex.unmock(connection);
    Orm.getORM.restore();
  });

  describe("formatting a model's attribute for persistence", () => {
    let result;
    before(() => {
      result = new Choice().format(attributes);
    });

    it('converts the attributes from pascal case to snake case', () => {
      expect(result).to.eql(snakeCaseAttributes);
    });

  });

  describe('parsing result sets from the database', () => {
    let result;

    before(() => {
      result = new Choice().parse(snakeCaseAttributes);
    });

    it('converts snake case to pascal case', () => {
      expect(result).to.eql(pascalCaseAttributes);
    });
  });

  describe('serializing to JSON', () => {
    let result;
    before(() => {
      result = new Choice(attributes).serialize();
    });

    it('returns back and object containing only the id, text, version, translation, phase, active, createdAt, updateAt', () => {
      const { id, text, version, translation, phase, active, createdAt, updatedAt } = attributes;
      expect(result).to.eql({ id, text, version, translation, phase, active, createdAt, updatedAt });
    });
  });

  describe("a model's uuid", () => {
    let choice;

    describe("when the model hasn't been saved", () => {
      before(() => {
        choice = new Choice();
        choice.setUUID();
      });

      it('generates a id', () => {
        expect(choice.get('id')).to.be.defined;
      });

    });

    describe('when the model has been saved', () => {
      before(() => {
        choice = new Choice();
        choice.isNew = false;
        choice.setUUID();
      });

      it('does not generate a uuid', () => {
        expect(choice.get('uuid')).to.be.undefined;
      });
    });

  });

  describe('validation', () => {
    let choice;

    before(() => {
      choice = new Choice();
      stub(validations, 'Text');
      choice.validate();
    });

    it('validates the text attribute', () => {
      expect(validations.Text).to.have.been.calledWith(choice.attributes);
    });

  });

  describe('before the model is saved', () => {
    let choice;

    before(() => {
      choice = new Choice();
      choice.setUUID = spy();
      choice.validate = spy();
      choice.trigger('saving');
    });

    it("sets the models id", () => {
      expect(choice.setUUID).to.have.been.called;
    });

    it('validates the models attributes', () => {
      expect(choice.validate).to.have.been.called;
    });

  });

});

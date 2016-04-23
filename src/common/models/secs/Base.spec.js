import { expect } from 'chai';
import { stub, spy } from 'sinon';

import knex from 'knex';
import bookshelf from 'bookshelf';
import mockKnex from 'mock-knex';
import * as Orm from '../../../data/orm';


let attributes = {
  id: '123-ksd-192kd-29kd',
  foreignKey: "82309-iasdlakkd-23adse"
};

let pascalCaseAttributes = {
  id: '123-ksd-192kd-29kd',
  foreignKey: "82309-iasdlakkd-23adse"
};

let snakeCaseAttributes = {
  "id": "123-ksd-192kd-29kd",
  "foreign_key": "82309-iasdlakkd-23adse"
};

describe('Base data model', () => {

  let connection, Base;

  before(() => {
    connection = knex({
      client: 'sqlite3',
      connection: {filename: ':memory:'}
    });

    mockKnex.mock(connection);
    stub(Orm, 'getORM').returns(bookshelf(connection));
    Base = require('../Base');
  });

  after(() => {
    mockKnex.unmock(connection);
    Orm.getORM.restore();
  });

  describe('instantiation', () => {
    describe('when foreign keys are passed to the base class constructor', () => {
      it('sets those keys on the state of the model', () => {
        const instance = new Base(attributes, { foreignKeys: ['relation_id']});
        expect(instance.foreignKeys).to.include('relation_id');
      });
    });
    describe('when foreign keys are not passed to the constructor', () => {
      it('sets an empty array on the state of the model', () => {
        const instance = new Base(attributes, {});
        expect(instance.foreignKeys.length).to.equal(0);
      });
    });
  });

  describe("formatting a model's attribute for persistence", () => {
    let base;
    beforeEach(() => {
      base = new Base({}, {persistenceWhitelist: ['id', 'foreignKey']});
    });
    it('converts the attributes from pascal case to snake case', () => {
      expect(base.format(attributes)).to.eql(snakeCaseAttributes);
    });

  });

  describe('parsing result sets from the database', () => {
    it('converts snake case to pascal case', () => {
      expect(new Base({}, {persistenceWhitelist: ['id', 'foreignKey']}).parse(snakeCaseAttributes)).to.eql(pascalCaseAttributes);
    });
  });

  describe("a model's id", () => {
    let base;

    describe("when the model hasn't been saved", () => {
      before(() => {
        base = new Base({}, {persistenceWhitelist: ['id', 'foreignKey']});
        base.setUUID();
      });

      it('generates a UUID', () => {
        expect(base.get('id')).to.be.defined;
      });

    });

    describe('when the model has been saved', () => {
      before(() => {
        base = new Base({}, {persistenceWhitelist: ['id', 'foreignKey']});
        base.isNew = stub().returns(false);
        base.setUUID();
      });

      it('does not generate a id', () => {
        expect(base.get('id')).to.be.undefined;
      });
    });

  });

  describe('validation', () => {
    it('Raises an abstract method exception', () => {
      expect(() => new Base({}, {persistenceWhitelist: ['id', 'foreignKey']}).validate()).to.throw(Error);
    });
  });

  describe('before the model is saved', () => {
    let base;

    before(() => {
      base = new Base({}, {persistenceWhitelist: ['id', 'foreignKey']});
      base.setUUID = spy();
      base.validate = spy();
      base.trigger('saving');
    });

    it("sets the models UUID", () => {
      expect(base.setUUID).to.have.been.called;
    });

    it('validates the models attributes', () => {
      expect(base.validate).to.have.been.called;
    });

  });

});

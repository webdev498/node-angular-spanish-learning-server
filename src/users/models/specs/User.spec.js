import { expect } from 'chai';
import { stub, spy } from 'sinon';

import knex from 'knex';
import bookshelf from 'bookshelf';
import mockKnex from 'mock-knex';
import * as validations from './../../validations';
import * as Orm from '../../../data/orm';

import bcrypt from 'bcrypt';

let attributes = {
  id: '123-ksd-192kd-29kd',
  firstName: 'Joe',
  lastName: 'Shmoe',
  email: 'joe@nowhere.net',
  password: 'secret',
  passwordConfirmation: 'password',
  passwordHash: 'hash',
  passwordSalt: 'salt'
};

let pascalCaseAttributes = {
  id: '123-ksd-192kd-29kd',
  firstName: 'Joe',
  lastName: 'Shmoe',
  email: 'joe@nowhere.net',
  passwordHash: 'hash',
  passwordSalt: 'salt'
};

let snakeCaseAttributes = {
  "id": "123-ksd-192kd-29kd",
  "first_name": "Joe",
  "last_name": "Shmoe",
  "email": "joe@nowhere.net",
  "password_hash": "hash",
  "password_salt": "salt"
};

describe('User data model', () => {

  let connection, User;

  before(() => {
    connection = knex({
      client: 'sqlite3',
      connection: {filename: ':memory:'}
    });

    mockKnex.mock(connection);
    stub(Orm, 'getORM').returns(bookshelf(connection));
    User = require('../User');
  });

  after(() => {
    mockKnex.unmock(connection);
    Orm.getORM.restore();
  });

  describe("formatting a model's attribute for persistence", () => {
    let result;
    before(() => {
      result = new User().format(attributes);
    });

    it('converts the attributes from pascal case to snake case', () => {
      expect(result).to.eql(snakeCaseAttributes);
    });

    it('does not contain the password and passwordConfirmation k/v pairs', () => {
      expect(result).to.not.include.keys('password', 'password_confirmation');
    });

  });

  describe('parsing result sets from the database', () => {
    let result;

    before(() => {
      result = new User().parse(snakeCaseAttributes);
    });

    it('converts snake case to pascal case', () => {
      expect(result).to.eql(pascalCaseAttributes);
    });
  });

  describe('sanitizing the models attributes', () => {
    let result;
    before(() => {
      result = new User(attributes).sanitize();
    });
    it('returns back and object containing only the id, firstName, lastName, and email', () => {
      const { id, firstName, lastName, email } = attributes;
      expect(result).to.eql({id, firstName, lastName, email});
    });
  });

  describe("a model's id", () => {
    let user;

    describe("when the model hasn't been saved", () => {
      before(() => {
        user = new User();
        user.setUUID();
      });

      it('generates a UUID', () => {
        expect(user.get('id')).to.be.defined;
      });

    });

    describe('when the model has been saved', () => {
      before(() => {
        user = new User();
        user.isNew = false;
        user.setUUID();
      });

      it('does not generate a id', () => {
        expect(user.get('id')).to.be.undefined;
      });
    });

  });

  describe('generating a cryptographic salt and hashing the password', () => {

    before(() => {
      stub(bcrypt, 'genSaltSync').returns('salt');
      stub(bcrypt, 'hashSync').returns('hash');
    });

    after(() => {
      bcrypt.genSaltSync.restore();
      bcrypt.hashSync.restore();
    });

    describe('when the model is new', () => {
      let user;

      before(() => {
        user = new User();
        user.hashPassword();
      });

      it('generates a salt and assignes it to the passwordSalt attribute', () => {
        expect(user.get('passwordSalt')).to.be.defined;
      });

      it('hashes the password', () => {
        expect(user.get('passwordHash')).to.be.defined;
      });

    });

    describe('when the model is not new', () => {
      let user;

      before(() => {
        user = new User();
        user.isNew = false;
        user.hashPassword();
      });

      it('does not generate a cryptographic salt', () => {
        expect(user.get('passwordSalt')).to.be.undefined;
      });

      it('does not generate a password hash', () => {
        expect(user.get('passwordHash')).to.be.undefined;
      });

    });

  });

  describe('validation', () => {
    let user;

    before(() => {
      user = new User();
      stub(validations, 'EmailAddress');
      stub(validations, 'PasswordComplexity');
      stub(validations, 'PasswordsMatch');
      user.validate();
    });

    it('validates the email address', () => {
      expect(validations.EmailAddress).to.have.been.calledWith(user.attributes);
    });

    it("validates the password's complexity", () => {
      expect(validations.PasswordComplexity).to.have.been.calledWith(user.attributes);
    });

    it('validates that the password and confirmation match', () => {
      expect(validations.PasswordsMatch).to.have.been.calledWith(user.attributes);
    });

  });

  describe('before the model is saved', () => {
    let user;

    before(() => {
      user = new User();
      user.setUUID = spy();
      user.validate = spy();
      user.hashPassword = spy();
      user.trigger('saving');
    });

    it("sets the models UUID", () => {
      expect(user.setUUID).to.have.been.called;
    });

    it('validates the models attributes', () => {
      expect(user.validate).to.have.been.called;
    });

    it('hashes the password and generates the salt', () => {
      expect(user.hashPassword).to.have.been.called;
    });

  });

});

import bcrypt from 'bcrypt';
import { getORM } from '../../data/orm';
import { EmailAddress, PasswordComplexity, PasswordsMatch } from './../validations';
import { toPascalCase, toSnakeCase } from '../../javascript/datatypes/string';
import * as UUID from '../../javascript/datatypes/uuid';

const Orm = getORM();

const tableName = 'public.users';
const idAttribute = 'id';

const PERSISTENCE_WHITELIST = ['id', 'firstName', 'lastName', 'email', 'passwordHash', 'passwordSalt'];

const User = Orm.Model.extend({
  tableName,
  idAttribute,

  constructor() {
    Orm.Model.apply(this, arguments);
    this.on('saving', this.beforeSave.bind(this));
  },

  // Format the model for persistence to the database
  format(attributes) {
    return Object.keys(attributes)
      .filter((attribute) => PERSISTENCE_WHITELIST.includes(attribute))
      .reduce((memo, attribute) => {
        memo[toSnakeCase(attribute)] = attributes[attribute];
        return memo;
      }, {});
  },

  // parse the data returned from the database to match the proper attributes
  parse(data) {
    return Object.keys(data).reduce((memo, property) => {
      memo[toPascalCase(property)] = data[property];
      return memo;
    }, {});
  },

  sanitize() {
    const { id, firstName, lastName, email } = this.attributes;

    return {
      id,
      firstName,
      lastName,
      email
    };
  },

  setUUID() {
    if (this.isNew) {
      this.set({id: UUID.v4()});
    }
  },

  // TODO: Make async
  hashPassword() {
    if (this.isNew) {
      let passwordSalt = bcrypt.genSaltSync(10);
      let passwordHash  = bcrypt.hashSync(this.get('password'), passwordSalt);
      this.set({ passwordSalt, passwordHash });
    }

  },

  validate() {
    [EmailAddress, PasswordComplexity, PasswordsMatch].forEach((validate) => {
      validate(this.attributes);
    });
  },

  beforeSave() {
    this.setUUID();
    this.validate();
    this.hashPassword();
  }

});

export default User;

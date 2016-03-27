import bcrypt from 'bcrypt';
import { getORM } from '../../data/orm';
import Base from './../../common/models/Base';
import { EmailAddress, PasswordComplexity, PasswordsMatch } from './../validations';

const Orm = getORM();

const tableName = 'public.users';

const persistenceWhitelist = ['id', 'firstName', 'lastName', 'email', 'passwordHash', 'passwordSalt'];
const versionableAttributes = persistenceWhitelist;

const User = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist, versionableAttributes });
    this.on('saving', () => this.hashPassword());
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

  serialize() {
    const { id, firstName, lastName, email, createdAt, updatedAt } = this.attributes;
    return {
      id,
      firstName,
      lastName,
      email,
      createdAt,
      updatedAt
    };
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
    [EmailAddress, PasswordComplexity, PasswordsMatch].forEach(validate => {
      validate(this.attributes);
    });
  }

});

export default Orm.model('User', User);

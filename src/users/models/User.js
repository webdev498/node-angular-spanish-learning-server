import bcrypt from 'bcrypt';
import { getORM } from '../../data/orm';
import Base from './../../common/models/Base';
import Address from './Address';
import Telephone from './Telephone';
import Nationality from './../../nationalities/models/Nationality';
import { EmailAddress, PasswordComplexity, PasswordsMatch } from './../validations';

const Orm = getORM();

const tableName = 'users';

const persistenceWhitelist = [
  'firstName',
  'lastName',
  'email',
  'passwordHash',
  'passwordSalt',
  'nationalityId',
  'gender',
  'dateOfBirth'
];

const versionableAttributes = persistenceWhitelist;

const User = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist, versionableAttributes });
    this.on('saving', () => this.hashPassword());
  },

  getForeignKeys() {
    return ['nationality_id'];
  },

  telephones() {
    return this.hasMany(Telephone);
  },

  addresses() {
    return this.hasMany(Address);
  },

  nationality() {
    return this.belongsTo(Nationality);
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
    const { id, firstName, lastName, email, dateOfBirth, gender, createdAt, updatedAt } = this.attributes;
    const { relations } = this;

    return {
      id,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      relations,
      createdAt,
      updatedAt
    };
  },

  // TODO: Make async
  hashPassword() {
    if (this.isNew() || !this.isHashed()) {
      let passwordSalt = bcrypt.genSaltSync(10);
      let passwordHash  = bcrypt.hashSync(this.get('password'), passwordSalt);
      this.set({ passwordSalt, passwordHash });
    }

  },

  validate() {
    let validations = [EmailAddress];

    if (this.isNew()) {
      validations = validations.concat([PasswordComplexity, PasswordsMatch]);
    }

    validations.forEach(validate => validate(this.attributes));
  },

  isHashed() {
    return this.get('passwordSalt') && this.get('passwordHash');
  }

});

export default Orm.model('User', User);

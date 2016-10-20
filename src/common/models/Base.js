import Orm from 'data/orm';
import { toPascalCase, toSnakeCase } from 'javascript/datatypes/string';
import * as UUID from 'javascript/datatypes/uuid';
import crypto from 'crypto';

const CRYPTO_ALGORITHM = 'sha1';
const DIGEST_TYPE = 'hex';

const idAttribute = 'id';

const Base = Orm.model('Base', {
  idAttribute,

  initialize(attributes, { persistenceWhitelist = [], versionableAttributes = [], foreignKeys = [] }) {
    this.on('saving', this.beforeSave.bind(this));
    this.on('updating', this.beforeUpdate.bind(this));
    this.persistenceWhitelist = persistenceWhitelist.concat(['id']);
    this.versionableAttributes = versionableAttributes;
    this.foreignKeys = foreignKeys;
  },

  // Format the model for persistence to the database
  format(attributes) {
    let { persistenceWhitelist } = this;

    return Object.keys(attributes)
      .filter((attribute) => persistenceWhitelist.includes(attribute))
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

  //defines an object that will be serialized to JSON when JSON.stringify is called
  serialize() { throw new Error("Abstract method. Override in your base class."); },

  setUUID() {
    if (this.isNew() && !this.has('id')) {
      this.set({id: UUID.v4()});
    }
  },

  generateVersion() {
    if(this.versionableAttributes && this.versionableAttributes.length) {
      const values = this.versionableAttributes.reduce((memo, attribute) => {
        if (this.attributes[attribute]) {
          memo[attribute] = this.attributes[attribute];
        }
        return memo;
      }, {});

      const string = JSON.stringify(values);
      const version = crypto.createHash(CRYPTO_ALGORITHM).update(string).digest(DIGEST_TYPE);
      this.set({ version });
    }
  },

  validate() { throw new Error("Abstract method. Override in your base class"); },

  beforeSave() {
    this.setUUID();
    this.generateVersion();
    this.validate();
  },

  beforeUpdate() {
    this.generateVersion();
    this.validate();
  }

});

export default Base;

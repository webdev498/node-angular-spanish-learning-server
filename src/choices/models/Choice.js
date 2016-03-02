import { getORM } from '../../data/orm';
import { Text } from './../validations';
import { toPascalCase, toSnakeCase } from '../../javascript/datatypes/string';
import * as UUID from '../../javascript/datatypes/uuid';
import crypto from 'crypto';

const CRYPTO_ALGORITHM = 'sha1';
const DIGEST_TYPE = 'hex';

const Orm = getORM();

const tableName = 'public.choices';
const idAttribute = 'id';

const PERSISTENCE_WHITELIST = [
  'id',
  'text',
  'translation',
  'phase',
  'active',
  'version'
];

const Choice = Orm.Model.extend({
  tableName,
  idAttribute,

  constructor() {
    Orm.Model.apply(this, arguments);
    this.on('saving', this.beforeSave.bind(this));
    this.on('updating', this.beforeUpdate.bind(this));
  },

  // Format the model for persistence to the database
  format(attributes) {
    return Object.keys(attributes)
      .filter(attribute => PERSISTENCE_WHITELIST.includes(attribute))
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

  // defines an object that will be serialized to JSON when JSON.stringify is called
  serialize() {
    const { id, text, version, translation, active, phase, createdAt, updatedAt } = this.attributes;

    return {
      id,
      text,
      version,
      translation,
      active,
      phase,
      createdAt,
      updatedAt
    };
  },

  setUUID() {
    if (this.isNew && !this.has('id')) {
      this.set({id: UUID.v4()});
    }
  },

  generateVersion() {
    const { id, text, translation, phase } = this.attributes;

    const string = JSON.stringify({ id, text, translation, phase });
    const version = crypto.createHash(CRYPTO_ALGORITHM).update(string).digest(DIGEST_TYPE);
    this.set({ version: version });
  },

  validate() {
    [Text].forEach(validate => { validate(this.attributes); });
  },

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

export default Choice;

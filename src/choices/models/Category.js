import { getORM } from '../../data/orm';
import './Choice';
import { Name } from './../validations';
import { toPascalCase, toSnakeCase } from '../../javascript/datatypes/string';
import * as UUID from '../../javascript/datatypes/uuid';
import crypto from 'crypto';

const CRYPTO_ALGORITHM = 'sha1';
const DIGEST_TYPE = 'hex';

const Orm = getORM();

const tableName = 'public.categories';
const idAttribute = 'id';

const PERSISTENCE_WHITELIST = [
  'id',
  'name',
  'parent_id'
];

const Category = Orm.model('Category', {
  tableName,
  idAttribute,

  constructor() {
    Orm.Model.apply(this, arguments);
    this.on('saving', this.beforeSave.bind(this));
    this.on('updating', this.beforeUpdate.bind(this));
  },

  choices(){
    return this.hasMany('Choice', 'category_id');
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

  //defines an object that will be serialized to JSON when JSON.stringify is called
  serialize() {
    const { id, name, parentId, createdAt, updatedAt } = this.attributes;

    return {
      id,
      name,
      parentId,
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
    const { id, name, parentId } = this.attributes;

    const string = JSON.stringify({ id, name, parentId });
    const version = crypto.createHash(CRYPTO_ALGORITHM).update(string).digest(DIGEST_TYPE);
    this.set({ version: version });
  },

  validate() {
    [Name].forEach(validate => { validate(this.attributes); });
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

export default Category;

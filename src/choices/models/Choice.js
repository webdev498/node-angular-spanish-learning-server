import Orm from '../../data/orm';
import './../../categories/models/Category';
import Base from './../../common/models/Base';
import { Text } from './../validations';



const tableName = 'choices';

const persistenceWhitelist = [
  'id',
  'text',
  'translation',
  'phase',
  'active',
  'version'
];

const Choice = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  categories() {
    return this.belongsToMany('Category');
  },

  // defines an object that will be serialized to JSON when JSON.stringify is called
  serialize() {
    const { id, text, version, translation, active, phase, createdAt, updatedAt } = this.attributes;
    const { relations } = this;

    return {
      id,
      text,
      version,
      translation,
      active,
      phase,
      relations,
      createdAt,
      updatedAt
    };
  },

  validate() {
    [Text].forEach((validate) => { validate(this.attributes); });
  }

});

export default Orm.model('Choice', Choice);

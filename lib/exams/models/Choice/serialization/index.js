import uuid from 'node-uuid';
import _ from 'lodash';

const SERIALIZATION_KEYS = ['id', 'type', 'text', 'selected', 'version', 'rel', 'createdAt', 'updatedAt'];

const defaults = () => {

  return {
    id: null,
    text: "",
    selected: false,
    version: null,
    createdAt: null,
    updatedAt: null
  };
};


const DESERIALIZATION_STRATEGIES = {
  'id': (id) => !id ?  uuid.v1() : String(id),
  'text': (text) => String(text || ''),
  'selected': (selected) => Boolean(selected || false),
  'version': (version) => String(version || ''),
  'createdAt': (createAt) => typeof createdAt === 'string' ? new Date(createAt) : new Date(),
  'updatedAt': (updatedAt) => typeof updatedAt === 'string' ? new Date(updatedAt) : new Date()
};

const buildRelations = (self) => {

  self.rel = {
    self: `/choices/${self.id}`
  };

  return self;
};

export const serializer = (choice) => {
  let serialized = {};
  choice = buildRelations(choice);

  SERIALIZATION_KEYS.forEach((key) => {
    serialized[key] = choice[key];
  });

  return serialized;
};

export const deserializer = (json) => {
  let deseralized = {};
  json = _.defaults(json, defaults());

  for (let key in DESERIALIZATION_STRATEGIES) {
    deseralized[key] = DESERIALIZATION_STRATEGIES[key](json[key]);
  }

  return deseralized;
};

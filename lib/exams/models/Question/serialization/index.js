import Choice from '../../Choice';
import uuid from 'node-uuid';
import _ from 'lodash';

const SERIALIZATION_KEYS = ['id', 'type', 'text', 'instructions', 'version', 'rel', 'createdAt', 'choices', 'updatedAt'];

const defaults = () => {

  return {
    id: null,
    type: "",
    text: "",
    instructions: "",
    version: null,
    choices: [],
    correctChoice: null,
    createdAt: null,
    updatedAt: null
  };
};


const DESERIALIZERS = {
  'id': (id) => !id ?  uuid.v1() : String(id),
  'type': (type) => String(type || ''),
  'text': (text) => String(text || ''),
  'instructions': (instructions) => String(instructions || ''),
  'description': (description) => String(description || 'No Description'),
  'version': (version) => String(version || ''),
  'choices': (choices) => choices.map((choice) => new Choice(choice)),
  'correctChoice': (correctChoice) => correctChoice ? new Choice(correctChoice) : null,
  'createdAt': (createAt) => typeof createdAt === 'string' ? new Date(createAt) : new Date(),
  'updatedAt': (updatedAt) => typeof updatedAt === 'string' ? new Date(updatedAt) : new Date()
};

const buildRelations = (self) => {
  self.rel = {
    self: `/questions/${self.id}`,
    choices: `/questions/${self.id}/choices`
  };

  if (self.correctChoice) {
    self.rel.correctChoice = `/questions/${self.id}/choices/${self.correctChoice.id}`;
  }

  return self;
};

export const serializer = (question) => {
  let serialized = {};
  question = buildRelations(question);

  SERIALIZATION_KEYS.forEach((key) => {
    serialized[key] = question[key];
  });

  return serialized;
};

export const deserializer = (json) => {
  let deseralized = {};
  json = _.defaults(json, defaults());

  for (let key in DESERIALIZERS) {
    deseralized[key] = DESERIALIZERS[key](json[key]);
  }

  return deseralized;
};

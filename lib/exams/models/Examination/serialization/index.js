import Question from '../../Question';

const SERIALIZATION_KEYS = ['id', 'title', 'instructions', 'questions', 'version', 'rel', 'createdAt', 'updatedAt'];

const DESERIALIZATION_STRATEGIES = {
  'id': (id) => String(id),
  'title': (title) => String(title || ''),
  'instructions': (instructions) => String(instructions || ''),
  'version': (version) => String(version || ''),
  'questions': (questions) => questions.map((question) => new Question(question)),
  'createdAt': (createAt) => new Date(createAt),
  'updatedAt': (updatedAt) => new Date(updatedAt)
};

const buildRelations = (self) => {

  self.rel = {
    self: `/examinations/${self.id}`,
    questions: `/examinations/${self.id}/questions`,
  };

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

  for (let key in DESERIALIZATION_STRATEGIES) {
    deseralized[key] = DESERIALIZATION_STRATEGIES[key](json[key]);
  }

  return deseralized;
};

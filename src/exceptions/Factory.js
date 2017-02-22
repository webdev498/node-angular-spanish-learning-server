import UnprocessableEntity from './requests/UnprocessableEntity';
import NotFoundError from './requests/NotFoundError';
import MissingRecordError from './runtime/MissingRecordError';

import {
  PasswordMatchError,
  PasswordComplexityError,
  InvalidEmailError,
  UserPasswordMismatchError
} from './../users/exceptions';

const serviceErrorConstructorMappings = {
  [PasswordMatchError] : UnprocessableEntity,
  [PasswordComplexityError] : UnprocessableEntity,
  [InvalidEmailError]: UnprocessableEntity,
  [UserPasswordMismatchError]: UnprocessableEntity,
  [MissingRecordError]: NotFoundError,
  [TypeError]: UnprocessableEntity
};

export const create = (request, error) => {
  const Ctor = serviceErrorConstructorMappings[error.constructor];
  return Ctor? new Ctor(request, error) : error;
};

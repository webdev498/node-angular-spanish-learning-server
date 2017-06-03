import UnprocessableEntity from './requests/UnprocessableEntity';
import NotFoundError from './requests/NotFoundError';
import MissingRecordError from './runtime/MissingRecordError';
import BadRequest from './requests/BadRequest';

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
  if (Ctor) {
    return new Ctor(request, error);
  } else if (error.message === 'Not Found') {
    return new NotFoundError(request, error);
  } else {
    return new BadRequest(request, error);
  }
};

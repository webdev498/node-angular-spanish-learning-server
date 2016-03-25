import UnprocessableEntity from './requests/UnprocessableEntity';

import {
  EmptyTextError
} from './../choices/exceptions';

import {
  PasswordMatchError,
  PasswordComplexityError,
  InvalidEmailError,
  UserPasswordMismatchError
} from './../users/exceptions';

const mapping = {
  [EmptyTextError] : UnprocessableEntity,
  [PasswordMatchError] : UnprocessableEntity,
  [PasswordComplexityError] : UnprocessableEntity,
  [InvalidEmailError]: UnprocessableEntity,
  [UserPasswordMismatchError]: UnprocessableEntity
};

export const create = (request, error) => {
  let Ctor = mapping[error.constructor];
  return Ctor? new Ctor(request, error) : error;
};

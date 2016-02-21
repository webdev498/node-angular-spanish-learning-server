import UnprocessableEntity from './requests/UnprocessableEntity';

import {
  EmptyTextError
} from './../choices/exceptions';


const mapping = {
  [EmptyTextError] : UnprocessableEntity
};

export const create = (request, error) => {
  let Ctor = mapping[error.constructor];
  return new Ctor(request, error);
};

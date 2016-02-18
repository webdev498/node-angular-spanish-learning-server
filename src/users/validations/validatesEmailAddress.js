import {
  InvalidEmailError
 } from '../exceptions';

 const EMAIL_PATTERN = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;

export default ({ email }) => {
  if (!EMAIL_PATTERN.test(email)) {
    throw new InvalidEmailError(`${email} is not a valid email address`);
  }
};

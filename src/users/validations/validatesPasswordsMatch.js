import { PasswordMatchError } from '../exceptions';

export default ({ password, passwordConfirmation }) => {

  if (password === passwordConfirmation) {
    return;
  }

  throw new PasswordMatchError();
};

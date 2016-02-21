import RuntimeError from './../../exceptions/runtime';

export default class PasswordMatchError extends RuntimeError {
  constructor(message = 'Password and Password Confirmation do not match.') {
    super(arguments);
    this.message = message;
  }
}

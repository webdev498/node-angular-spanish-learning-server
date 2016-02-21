import RuntimeError from './../../exceptions/runtime';

export default class PasswordComplexityError extends RuntimeError {
  constructor(message = 'Password does not meet the complexity requirements.') {
    super(arguments);
    this.message = message;
  }
}

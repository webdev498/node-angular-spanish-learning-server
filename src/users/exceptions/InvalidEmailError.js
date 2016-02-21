import RuntimeError from './../../exceptions/runtime';

export default class InvalidEmailError extends RuntimeError {
  constructor(message = 'Email address is not a valid format') {
    super(arguments);
    this.message = message;
  }
}

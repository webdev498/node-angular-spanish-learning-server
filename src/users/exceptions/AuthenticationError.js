import RuntimeError from './../../exceptions/runtime';

export default class AuthenticationError extends RuntimeError {
  constructor(message = 'Unable to authenticate user') {
    super(arguments);
    this.message = message;
  }
}
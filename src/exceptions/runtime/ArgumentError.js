import RuntimeError from '.';

export default class ArgumentError extends RuntimeError {
  constructor(message) {
    super();
    this.message = message;
  }
}

import RuntimeError from '.';

export default class AbstractMethodError extends RuntimeError {
  constructor(message = 'Abstract Method. Please override in derived classes') {
    super();
    this.message = message;
  }
}

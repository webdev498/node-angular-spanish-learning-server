import RuntimeError from '.';
export default class MissingRecordError extends RuntimeError {
  constructor(message) {
    super();
    this.message = message;
  }
}

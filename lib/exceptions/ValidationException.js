// A ValidationException is raised whenever a resource is created but does not
// represent a valid domain object. Typically this occurs because the entity does
// not meet the business rules enforced by the server's application logic

export default class ValidationException extends Error {
  constructor(message = 'Data model is invalid') {
    super(message);
    this.name = 'ValidationException';
    this.status = 418;
    this.message = message;
    this.fatal = false;
    Error.captureStackTrace(this);
  }

  toString() {
    return this.message;
  }

  toJSON() {
    const { name, status, message, stack } = this;
    return {
      name,
      status,
      message,
      stack
    };
  }
}

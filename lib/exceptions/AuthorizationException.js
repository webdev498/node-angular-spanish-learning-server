// The AuthorizationException represents an error that occurs when a user attempts
// to access or modify a resource for which the user lacks the required privileges.
// The resulting HTTP error to the user will be 401 FORBIDDEN

export default class AuthorizationException extends Error {
  constructor(message = 'You are not authorized to perform this action') {
    super(message);
    this.name = 'AuthorizationException';
    this.status = 403;
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

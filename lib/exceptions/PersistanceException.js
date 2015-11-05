// The PersistenceException represents a generic error that occured at the data
// access layer (DAL). A PersistenceException that is raised in the light of another
// Exception (i.d. connection error) will have an 'originalError' property containing
// the originating error.

export default class PersistenceException extends Error {
  constructor(origialError, message = 'There was an error saving a record to the database') {
    super(message);
    this.name = 'PersistenceException';
    this.status = 500;
    this.fatal = false;
    this.originalError = origialError;
    Error.captureStackTrace(this);
  }

  toString() {
    let { name, message } = this;
    return `${name} - ${message}`;
  }

  toJSON(){
    let { name, status, message, originalError } = this;

    return {
      name,
      status,
      message,
      originalError
    };
  }

}

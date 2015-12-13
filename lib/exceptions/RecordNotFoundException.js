// RecordNotFoundException represent an attempt to access a resource that
// does not reside on the server (i.e. Database records that were never created or have been deleted)

export default class RecordNotFoundException extends Error {
  constructor(message = 'Unable to find record with matching id') {
    super(message);
    this.name = 'RecordNotFoundException';
    this.status = 404;
    this.fatal = false;
    Error.captureStackTrace(this);
  }

  toString() {
    let { name, message } = this;
    return `${name} - ${message}`;
  }

  toJSON(){
    let { name, status, message, stack } = this;

    return {
      name,
      status,
      message,
      stack
    };
  }

}

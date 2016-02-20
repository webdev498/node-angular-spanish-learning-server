export default class RuntimeError extends Error {
  constructor() {
    super(arguments);
    Error.captureStackTrace(this, this.constructor);
  }
}

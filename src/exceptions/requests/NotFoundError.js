import RequestError from './index';
import { NOT_FOUND } from 'http/status-codes';

const DEFAULT_BAD_REQUEST_MESSAGE = 'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.';

export default class NotFoundError extends RequestError {
  constructor(request, originalError, message = DEFAULT_BAD_REQUEST_MESSAGE) {
    super(request, originalError);
    this.statusCode = NOT_FOUND;
    this.name = this.constructor.name;
    this.stack = originalError.stack;
    this.message = message;
  }
}

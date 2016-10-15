import RequestError from '.';
import { UNPROCESSABLE_ENTITY } from 'http/status-codes';

const DEFAULT_BAD_REQUEST_MESSAGE = 'The request was formatted correctly but cannot be processed in its current form.';

export default class UnprocessableEntityError extends RequestError {
  constructor(request, originalError, message = DEFAULT_BAD_REQUEST_MESSAGE) {
    super(request, originalError);
    this.statusCode = UNPROCESSABLE_ENTITY;
    this.name = this.constructor.name;
    this.message = message;
  }
}

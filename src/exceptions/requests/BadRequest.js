import RequestError from '.';
import { BAD_REQUEST } from 'http/statusCodes';

const DEFAULT_BAD_REQUEST_MESSAGE = 'The request could not be fulfilled due to the incorrect syntax of the request.';

export default class BadRequestError extends RequestError {
  constructor(request, originalError, message = DEFAULT_BAD_REQUEST_MESSAGE) {
    super(request, originalError);
    this.statusCode = BAD_REQUEST;
    this.name = this.constructor.name;
    this.message = message;
  }
}

import RequestError from '.';
import { UNAUTHORIZED } from 'http/status-codes';

const DEFAULT_UNAUTHENTICATED_MSG = 'You are not authorized to perform actions on this resource';

export default class UnauthenticatedError extends RequestError {
  constructor(request, originalError = null, message = DEFAULT_UNAUTHENTICATED_MSG) {
    super(request, originalError);
    this.statusCode = UNAUTHORIZED;
    this.name = this.constructor.name;
    this.message = message;
  }
}

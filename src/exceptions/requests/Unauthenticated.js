import RequestError from '.';
import { FORBIDDEN } from './../../http/statusCodes';

const DEFAULT_UNAUTHENTICATED_MSG = 'You are not authorized to perform actions on this resource';

export class UnauthenticatedError extends RequestError {
  constructor(request, originalError, message = DEFAULT_UNAUTHENTICATED_MSG) {
    super(request, originalError);
    this.statusCode = FORBIDDEN;
    this.name = this.constructor.name;
    this.message = message;
  }
}

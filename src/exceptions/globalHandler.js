import * as ServiceErrorFactory from 'exceptions/Factory';
import {logError} from 'logging';

function buildErrorMessage(request, error = {}) {
  return`An unhandled exception occured:
                     \tRequest ID: ${request.id}
                     \tRequest Authenticated: ${request.auth.isAuthenticated},
                     \tRequest URL: ${request.path}
                     \tRequest Method: ${request.method.toUpperCase()}
                     \tRequest Remote Address: ${request.info.remoteAddress}
                     \tRequest Parameters: ${JSON.stringify(request.params)}
                     \tRequest Query: ${JSON.stringify(request.query)}
                     \tError Name: ${error.name}
                     \tError Message: ${error.message}
                     \tError Stack: ${error.stack}`;
}

export const register = (server, options, next) => {
  server.ext('onPreResponse', (request, reply) => {

    if (request.response.isBoom) { // reply with a slightly more user-friendly error message
      const serviceError = ServiceErrorFactory.create(request, request.response);
      logError(buildErrorMessage(request, serviceError));
      reply(serviceError).statusCode = serviceError.statusCode;
    } else if (request.response.source && request.response.source.isError) {
      const serviceError = ServiceErrorFactory.create(request, request.response.source);
      logError(buildErrorMessage(request, serviceError));
      reply(serviceError).statusCode = serviceError.statusCode;
    } else {
      reply.continue();
    }
  });
  next();
};

register.attributes = { name: 'CGI Global Exception Handler', version: '0.0.1' };

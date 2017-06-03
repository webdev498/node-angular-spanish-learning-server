import * as ServiceErrorFactory from 'exceptions/Factory';
import {logError} from 'logging';

function buildErrorMessage(request, error) {
  return`An unhandled exception occured:
                     Request ID: ${request.id}
                     Request Authenticated: ${request.auth.isAuthenticated},
                     Request URL: ${request.path}
                     Request Method: ${request.method.toUpperCase()}
                     Request Remote Address: ${request.info.remoteAddress}
                     Request Parameters: ${JSON.stringify(request.params)}
                     Request Query: ${JSON.stringify(request.query)}
                     Error Name: ${error.name}
                     Error Message: ${error.message}
                     Error Stack: ${error.stack}`;
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

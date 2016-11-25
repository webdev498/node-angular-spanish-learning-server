import * as ServiceErrorFactory from 'exceptions/Factory';
import {logError} from 'logging';

export const register = (server, options, next) => {
  server.ext('onPreResponse', (request, reply) => {
    if (request.response.isBoom) { // reply with a slightly more user-friendly error message
      const serviceError = ServiceErrorFactory.create(request, request.response);
      logError(serviceError);
      reply(serviceError).statusCode = serviceError.statusCode;
    } else if (request.response.source && request.response.source.isError) {
      const serviceError = ServiceErrorFactory.create(request, request.response.source);
      logError(serviceError);
      reply(serviceError).statusCode = serviceError.statusCode;
    } else {
      reply.continue();
    }
  });
  next();
};

register.attributes = { name: 'CGI Global Exception Handler', version: '0.0.1' };

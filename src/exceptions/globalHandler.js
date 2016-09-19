import * as ServiceErrorFactory from 'exceptions/Factory';
const name = 'CGI Global Exception Handler';
const version = '0.0.1';

export const register = (server, options, next) => {
  server.ext('onPreResponse', (request, reply) => {
    if (request.response.isBoom) { // reply with a slightly more user-friendly error message
      let serviceError = ServiceErrorFactory.create(request, request.response);
      reply(serviceError).statusCode = serviceError.statusCode;
    } else {
      reply.continue();
    }
  });
  next();
};

register.attributes = { name, version };

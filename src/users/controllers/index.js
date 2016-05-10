import * as UserService from '../service';
import * as TokenProvider from './../../authentication/tokenProvider';
import * as ServiceErrorFactory from './../../exceptions/Factory';
import { CREATED } from './../../http/statusCodes';

export const create = (request, reply) => {
  UserService.signup(request.payload).then(
    (user) => {
      TokenProvider.sign(user.sanitize()).then((token) => {
        return reply({token}).statusCode = CREATED;
      });
    },
    (error) => {
      let serviceError = ServiceErrorFactory.create(request, error);
      reply(serviceError).statusCode = serviceError.statusCode;
    }
  );
};

export const list = (request, reply) => {
  return UserService.all().then(
    reply,
    (error) => {
      let serviceError = ServiceErrorFactory.create(request, error);
      reply(serviceError).statusCode = serviceError.statusCode;
    }
  );
};

export const get = (request, reply) => {
  return UserService.get(request.params).then(
    reply,
    (error) => {
      let serviceError = ServiceErrorFactory.create(request, error);
      reply(serviceError).statusCode = serviceError.statusCode;
    }
  );
};


export const update = (request, reply) => {
  return UserService.update(request).then(
    reply,
    (error) => {
      let serviceError = ServiceErrorFactory.create(request, error);
      reply(serviceError).statusCode = serviceError.statusCode;
    }
  );
};

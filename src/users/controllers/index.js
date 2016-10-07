import * as UserService from '../service';
import * as TokenProvider from './../../security/authentication/tokenProvider';
import * as ServiceErrorFactory from './../../exceptions/Factory';
import { CREATED } from './../../http/statusCodes';
import * as EmailMessage from 'email';

export const create = async (request, reply) => {
  try {
    const user = await UserService.signup(request.payload);
    const [token] = await Promise.all([
        TokenProvider.sign(user.sanitize()),
        EmailMessage.signupConfirmation(user)
      ]);
    return reply({ token }).statusCode = CREATED;
  } catch (error) {
    let serviceError = ServiceErrorFactory.create(request, error);
    return reply(serviceError).statusCode = serviceError.statusCode;
  }
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

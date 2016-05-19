import * as NationalityService from './../service';
import * as ServiceErrorFactory from './../../exceptions/Factory';

export const list = (request, reply) => {
  return NationalityService.all().then(
    reply,
    (error) => {
      let serviceError = ServiceErrorFactory.create(request, error);
      reply(serviceError).statusCode = serviceError.statusCode;
    }
  );
};

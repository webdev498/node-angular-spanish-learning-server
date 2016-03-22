import { CREATED } from './../../http/statusCodes';
import * as ServiceErrorFactory from './../../exceptions/Factory';
import * as CategoriesService from './../service';

export const create = (request, reply) => {
  return CategoriesService.create(request.payload).then(
    category => reply(category).statusCode = CREATED,
    error => {
      let serviceError = ServiceErrorFactory.create(request, error);
      reply(serviceError).statusCode = serviceError.statusCode;
    }
  );
};

import { CREATED, OK, NO_CONTENT } from './../../http/statusCodes';
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

export const all = (request, reply) => {
  return CategoriesService.all().then(
    categories => reply(categories).statusCode = OK,
    error => {
      let serviceError = ServiceErrorFactory.create(request, error);
      reply(serviceError).statusCode = serviceError.statusCode;
    }
  );
};

export const remove = (request, reply) => {
  return CategoriesService.remove(request.params).then(
    () => reply().statusCode = NO_CONTENT,
    error => {
      let serviceError = ServiceErrorFactory.create(request, error);
      reply(serviceError).statusCode = serviceError.statusCode;
    }
  );
};

export const update = (request, reply) => {
  const { id } = request.params;
  const { name } = request.payload;

  return CategoriesService.update({ id, name }).then(
    category => reply(category).statusCode = OK,
    error => {
      let serviceError = ServiceErrorFactory.create(request, error);
      reply(serviceError).statusCode = serviceError.statusCode;
    }
  );
};

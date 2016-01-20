import * as ChoiceService from '../service';
import { CREATED, OK } from './../../http/statusCodes';

export const create = (request, reply) => {
  return ChoiceService.create(request.payload).then(
    (choice) => {
      reply(choice).statusCode = CREATED;
    },
    (error) => {
      reply(error);
    }
  );
};

export const update = (request, reply) => {
  return ChoiceService.update(request.params, request.payload).then(
    (choice) => {
      reply(choice).statusCode = OK;
    },
    (error) => {
      const { statusCode } = error;
      reply(error).statusCode = statusCode;
    }
  );
};

export const list = (request, reply) => {
  return ChoiceService.all(request.params).then(
    (choices) => {
      reply(choices);
    },
    (error) => {
      const { statusCode } = error;
     reply(error).statusCode = statusCode;
    }
  );
};

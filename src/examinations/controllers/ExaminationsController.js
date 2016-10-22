//@flow
import type ExaminationService from '../services/ExaminationService';
import type { Request } from 'http/index';
import { CREATED } from 'http/status-codes';

export default class ExaminationsController {
  service: ExaminationService;

  constructor(service: ExaminationService) {
    this.service = service;
  }

  async create(request: Request, reply: Function) {
    try {
      const exam = await this.service.create(request);
      reply(exam).statusCode = CREATED;
    } catch (error) {
      reply(error);
    }
  }
  async submit(request: Request, reply: Function) {
    try {
      const { params, payload } = request;
      const { credentials } = request.auth;

      if(credentials.get('id') !== params.userId) {
        throw Error();
      }

      const result = await this.service.submit(params.id, credentials, payload);
      reply(result);
    } catch (error) {
      reply(error);
    }
  }
}

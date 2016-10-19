//@flow
import TelephonesService from '../service/TelephoneService';
import { NO_CONTENT } from 'http/statusCodes';
import type { Request } from 'http/index';

export default class TelephoneController {
  service: TelephonesService

  constructor(service: TelephonesService) {
    this.service = service;
  }

  async update(request: Request, reply: Function) {
    try {
      await this.service.update(request);
      reply().statusCode = NO_CONTENT;
    } catch (error) {
      reply(error);
    }
  }
}

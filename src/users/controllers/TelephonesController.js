//@flow
import TelephonesService from '../service/TelephoneService';
import { NO_CONTENT, CREATED } from 'http/status-codes';
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

  async create(request: Request, reply: Function) {
    try {
      const newPhone = await this.service.add(request);
      reply(newPhone).statusCode = CREATED;
    } catch (error) {
      reply(error);
    }
  }
}

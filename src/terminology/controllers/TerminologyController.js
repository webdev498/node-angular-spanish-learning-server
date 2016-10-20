/* @flow */
import { NO_CONTENT } from 'http/status-codes';
import type TerminologyService from '../service/TerminologyService';
import type { Request } from 'http/index';

export default class TerminologyController {
  service: TerminologyService;

  constructor(service: TerminologyService) {
    this.service = service;
  }

  async exclude(request: Request, reply: Function) {
    try {
      await this.service.exclude(request.payload);
      reply().statusCode = NO_CONTENT;
    } catch (error) {
      reply(error);
    }
  }

  async list(request: Request, reply: Function) {
    try {
      reply(await this.service.list(request.query));
    } catch (error) {
      reply(error);
    }
  }

  async listByName(request: Request, reply: Function) {
    try {
      reply(await this.service.list(request.params));
    } catch (error) {
      reply(error);
    }
  }

}

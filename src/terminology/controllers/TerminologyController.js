/* @flow */
import { NO_CONTENT } from 'http/status-codes';
import type TerminologyService from 'terminology/service/TerminologyService';
import type { Request } from 'http/index';

export default class TerminologyController {
  service: TerminologyService;

  constructor(service: TerminologyService) {
    this.service = service;
  }

  async exclude(request: Request, reply: Function) {
    try {
      const { sourceId, languageId } = request.params;

      if (sourceId && languageId ) {
        await this.service.exclude(sourceId, languageId, request.payload.targets);
      } else {
        const { source, languageId, targets } = request.payload;
        await this.service.exclude(source.id, languageId, targets);
      }

      reply().statusCode = NO_CONTENT;
    } catch (error) {
      reply(error);
    }
  }

  async list(request: Request, reply: Function) {
    try {
      reply(await this.service.list(request));
    } catch (error) {
      reply(error);
    }
  }

  async update(request: Request, reply: Function) {
    try {
      await this.service.update(request.params, request.payload);
      reply().statusCode = NO_CONTENT;
    } catch (error) {
      reply(error);
    }
  }

  async fetch(request: Request, reply: Function) {
    try {
      reply(await this.service.fetch(request.params));
    } catch (error) {
      reply(error);
    }
  }

  async getTranslations(request: Request, reply: Function) {
    try {
      const translations = this.service.findTranslations(request.params);
      reply(translations);
    } catch (error) {
      reply(error);
    }
  }

}

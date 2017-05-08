/* @flow */
import { NO_CONTENT } from 'http/status-codes';
import type TerminologyService from 'terminology/service/TerminologyService';
import type { Request } from 'http/index';
import TermListExporter from '../exports/TermListExporter';
import type Term from '../models/Term';

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

  async allTermsWithTranslations(request: Request, reply: Function) {
    const terms: Array<Term> = await this.service.list({
      params: {
        language: 'English'
      },
      query: {
        withTranslations: true,
        associated: ['categories']
      }
    });

    if (request.headers.accept === 'application/pdf') {
      const exporter = new TermListExporter(terms);
      const stream = exporter.convertToPDF();
      const response = request.raw.res;
      response.setHeader('content-type', 'application/pdf');
      response.setHeader('content-disposition', 'attachment; filename=terms.pdf;');
      stream.pipe(response);
      stream.end();
    } else {
      reply({message: 'Unsupported Media Type'}).statusCode = 415;
    }
  }

}

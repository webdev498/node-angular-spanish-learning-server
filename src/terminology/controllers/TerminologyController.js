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
      reply(await this.service.list(request.query));
    } catch (error) {
      reply(error);
    }
  }

  async listWithTranslations(request: Request, reply: Function) {
    try {
      const { categories, count }: { categories: Array<Object>; count: number } = request.query;
      const { languageName }: { languageName: string } = request.params;

      const terms = await this.service.list({languageName, categories, count, includeTranslations: true });
      const translatedTerms = await this.service.fetchTranslations(terms);
      const results = mapTranslationToTerm(terms, translatedTerms, languageName);
      reply(results);
    } catch(error) {
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

function mapTranslationToTerm(sourceTerms: BookshelfCollection, targetTerms: BookshelfCollection, languageName: string) {
  if (sourceTerms.isEmpty() || targetTerms.isEmpty()) {
    throw new Error('Either sourceTerms and targetTerms are empty and cannot be mapped');
  }

  const foreignKey = languageName === 'Spanish' ? 'source' : 'target';
  const firstTerm = sourceTerms.head();
  const translationType = Object.keys(firstTerm.relations).find(key => key.includes('Translations'));
  if (!translationType) {
    throw new Error('No translation associated with sourceTerms');
  }

  const results = sourceTerms.reduce((accumulator, source: BookshelfModel) => {
    let translations = source.related(translationType);
    if (translations == null) {
      throw new Error(`Missing ${translationType} from source term in translation`);
    } else if (typeof translations.pluck === 'function') {
      const keys = translations.pluck(foreignKey);
      targetTerms.each((target) => {
        if (keys.includes(target.get('id'))) {
          if (accumulator[source.get('id')]) {
            accumulator[source.get('id')].translations.push(target);
          } else {
            accumulator[source.get('id')] = { term: source, translations: [target]}
          }
        }
      });
    }

    return accumulator;
  }, {});

  return Object.keys(results).map(key => results[key]);

}

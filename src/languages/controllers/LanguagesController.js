//@flow

import type { Request } from 'cgihttp/index';
import LanguageService from '../service/LanguageService';

export default class LanguagesController {
  service: LanguageService;

  constructor(service: LanguageService) {
    this.service = service;
  }

  async list(request: Request, reply: Function) {
    try {
      const languages = await this.service.all();
      reply(languages);
    } catch (error) {
      reply(error);
    }
  }
}

//@flow
import ExaminationResultService from 'examinations/services/ExaminationResultService';
import type { Request } from 'http/index';

export default class ExaminationResultsController {
  service: ExaminationResultService;
  
  constructor(service: ExaminationResultService ) {
    this.service = service;
  }

  async latestForUser(request: Request, reply: Function) {
    const { credentials } = request.auth;
    try {
      const results = await this.service.getResultsForUser(credentials, 1);
      reply(results);
    } catch (error) {
      reply(error);
    }
  }
}
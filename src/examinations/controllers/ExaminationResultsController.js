//@flow
import ExaminationResultService from 'examinations/services/ExaminationResultService';
import UnauthorizedError from 'exceptions/requests/Unauthorized.js';
import type { Request } from 'http/index';

export default class ExaminationResultsController {
  service: ExaminationResultService;
  
  constructor(service: ExaminationResultService ) {
    this.service = service;
  }

  async latestForUser(request: Request, reply: Function) {
    const { id } = request.params;
    const { credentials } = request.auth;
    try {
      if (id !== credentials.get('id')) {
        throw new UnauthorizedError(request, 'You do not have permission to request this users results');
      }
      const results = await this.service.getResultsForUser(credentials, 1);
      reply(results);
    } catch (error) {
      reply(error);
    }
  }
}
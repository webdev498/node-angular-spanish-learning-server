//@flow
import type ExaminationService from '../services/ExaminationService';
import type { Request } from 'http/index';
import { CREATED } from 'http/status-codes';
import Unauthorized from 'exceptions/requests/Unauthorized';

export default class ExaminationsController {
  service: ExaminationService;

  constructor(service: ExaminationService) {
    this.service = service;
  }

  async create(request: Request, reply: Function) {
    try {
      const { credentials } = request.auth;
      const exam = await this.service.create(request, credentials);
      reply(exam).statusCode = CREATED;
    } catch (error) {
      reply(error);
    }
  }

  async createPractice(request: Request, reply: Function) {
    try {
      const exam = await this.service.generatePracticeExam(request);
      reply(exam).statusCode = CREATED;
    } catch (error) {
      reply(error);
    }
  }

  async feedback(request: Request, reply: Function) {
    try {
      const { payload } = request;
      const { credentials } = request.auth;

      const result = await this.service.feedback(credentials, payload);
      reply(result);
    } catch (error) {
      reply(error);
    }
  }

  async getExam(request: Request, reply: Function) {
     try {
      const { params } = request;

      const result = await this.service.getExam(params.id);
      reply(result);
    } catch (error) {
      reply(error);
    } 
  }

  async submit(request: Request, reply: Function) {
    try {
      const { params, payload } = request;
      const { credentials } = request.auth;

      if(credentials.get('id') !== params.userId) {
        throw new Unauthorized(request, { message: 'User ID mismatch. Logged-in user cannot submit exam for grading'});
      }

      const result = await this.service.submit(params.id, credentials, payload);
      reply(result);
    } catch (error) {
      reply(error);
    }
  }
}

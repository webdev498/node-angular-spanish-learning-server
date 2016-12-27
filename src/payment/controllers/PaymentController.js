//@flow
import type StudyBillingPlanService from '../service/StudyBillingPlanService';
import type { Request } from 'http/index';
import { CREATED } from 'http/status-codes';

export default class PaymentController {
  service: StudyBillingPlanService;

  constructor(service: StudyBillingPlanService) {
    this.service = service;
  }

  async processStudyBillingPlan(request: Request, reply: Function) {
    try {
      const planId = await this.service.create();
      const result = await this.service.process(planId);
      reply(result);
    } catch (error) {
      reply(error);
    }
  }

  async finalizeStudy(request: Request, reply: Function) {
    try {
      const { payload } = request;
      const { credentials } = request.auth;

      const result = await this.service.finalizeStudy(credentials, payload.token);
      reply(result);
    } catch (error) {
      reply(error);
    }
  }

  async cancelStudyBillingPlan(request: Request, reply: Function) {
    try {
      const { credentials } = request.auth;

      const result = await this.service.cancelStudyBillingPlan(credentials);
      reply(result);
    } catch (error) {
      reply(error);
    }
  }
}
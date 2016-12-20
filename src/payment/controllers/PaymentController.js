//@flow
import type BillingPlanService from '../service/BillingPlanService';
import type { Request } from 'http/index';
import { CREATED } from 'http/status-codes';

export default class PaymentController {
  service: BillingPlanService;

  constructor(service: BillingPlanService) {
    this.service = service;
  }

  async createBillingPlan(request: Request, reply: Function) {
    try {
      const planId = await this.service.create();
      reply(planId).statusCode = CREATED;
    } catch (error) {
      reply(error);
    }
  }

  async processBillingPlan(request: Request, reply: Function) {
    try {
      const { payload } = request;
      const { credentials } = request.auth;

      const result = await this.service.process(credentials, payload);
      reply(result);
    } catch (error) {
      reply(error);
    }
  }
}
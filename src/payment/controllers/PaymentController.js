//@flow
import type BillingPlanService from '../service/BillingPlanService';
import type { Request } from 'http/index';
import { CREATED } from 'http/status-codes';

export default class PaymentController {
  service: BillingPlanService;

  constructor(service: BillingPlanService) {
    this.service = service;
  }

  async processBillingPlan(request: Request, reply: Function) {
    try {
      const planId = await this.service.create();
      const result = await this.service.process(planId);
      reply(result);
    } catch (error) {
      reply(error);
    }
  }

  async finalize(request: Request, reply: Function) {
      
  }
}
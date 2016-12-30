//@flow
import type StudyBillingPlanService from 'payment/service/StudyBillingPlanService';
import type UserService from 'users/service/UserService';
import type { Request } from 'http/index';
import { CREATED } from 'http/status-codes';

export default class PaymentController {
  service: StudyBillingPlanService;
  userService: UserService;

  constructor(service: StudyBillingPlanService, userService: UserService) {
    this.service = service;
    this.userService = userService;
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
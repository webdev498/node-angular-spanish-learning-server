//@flow
import type StudyBillingPlanService from 'payment/service/StudyBillingPlanService';
import type UserService from 'users/service/UserService';
import type { Role } from 'security/authorization/models/Role';
import type SubscriptionService from 'subscriptions/services/SubscriptionService';
import type { Request } from 'http/index';
import { CREATED } from 'http/status-codes';

export default class PaymentController {
  studyBillingService: StudyBillingPlanService;
  subscriptionService: SubscriptionService;
  userService: UserService;

  studyLevel: '2';

  constructor(studyBillingService: StudyBillingPlanService, 
              userService: UserService,
              subscriptionService: SubscriptionService) {
    this.studyBillingService = studyBillingService;
    this.userService = userService;
    this.subscriptionService = subscriptionService;
  }

  async processStudyBillingPlan(request: Request, reply: Function) {
    try {
      const planId = await this.studyBillingService.create();
      const result = await this.studyBillingService.process(planId);
      reply(result);
    } catch (error) {
      reply(error);
    }
  }

  async finalizeStudy(request: Request, reply: Function) {
    try {
      const { payload } = request;
      const { credentials } = request.auth;

      const result = await this.studyBillingService.finalizeStudy(credentials, payload.token);
      //update user to study role
      const role = await Role.where({name: 'Study User').fetch();
      this.userService.changeRole(result.userId, role);
      //save paypal credentials
      const user = await this.userService.get({id: result.userId});
      this.subscriptionService.create(user, this.studyLevel, result.agreement);
      reply({result: CREATED});
    } catch (error) {
      reply(error);
    }
  }

  async cancelStudyBillingPlan(request: Request, reply: Function) {
    try {
      const { credentials } = request.auth;

      const result = await this.studyBillingService.cancelStudyBillingPlan(credentials);
      //update user to exam role
      const role = await Role.where({name: 'General User').fetch();
      this.userService.changeRole(result.userId, role);
      //save paypal credentials
      const user = await this.userService.get({id: result.userId});
      this.subscriptionService.cancel(user);
      reply({result: CREATED});
    } catch (error) {
      reply(error);
    }
  }
}
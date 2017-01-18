//@flow
import type StudyBillingPlanService from 'payment/service/StudyBillingPlanService';
import type UserService from 'users/service/UserService';
import Role from 'security/authorization/models/Role';
import SubscriptionService from 'subscriptions/services/SubscriptionService';
import type { Request } from 'http/index';
import { CREATED, NO_CONTENT } from 'http/status-codes';

export default class PaymentController {
  studyBillingService: StudyBillingPlanService;
  subscriptionService: SubscriptionService;
  userService: UserService;

  studyLevel: 'study';

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
      reply(result).statusCode = CREATED;
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
      const role = await Role.where({name: 'Study User'}).fetch();
      this.userService.changeRole(result.userId, role);
      //save paypal credentials
      const user = await this.userService.get({id: result.userId});
      this.subscriptionService.create(user, this.studyLevel, result.agreement);
      reply().statusCode = NO_CONTENT;
    } catch (error) {
      reply(error);
    }
  }

  async cancelStudyBillingPlan(request: Request, reply: Function) {
    try {
      const { credentials } = request.auth;

      //update paypal credentials
      const user = await this.userService.get({id: credentials.userId});
      const subscription = user.related('subscription');
      const billingAgreement = subscription.get('billingAgreement');

      await this.subscriptionService.cancel(user);

      const result = await this.studyBillingService.cancelStudyBillingPlan(credentials, billingAgreement);
      const role = await Role.where({name: 'General User'}).fetch();
      this.userService.changeRole(result.userId, role);
      reply().statusCode = NO_CONTENT;
    } catch (error) {
      reply(error);
    }
  }
}

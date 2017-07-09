//@flow
import type StudyBillingPlanService from 'payment/service/StudyBillingPlanService';
import type UserService from 'users/service/UserService';
import Role from 'security/authorization/models/Role';
import SubscriptionService from 'subscriptions/services/SubscriptionService';
import type { Request } from 'http/index';
import { CREATED, NO_CONTENT, PRECONDITION_FAILED } from 'http/status-codes';
import type PayflowBillingService from 'payment/service/PayflowBillingService';

export default class PaymentController {
  studyBillingService: StudyBillingPlanService;
  subscriptionService: SubscriptionService;
  userService: UserService;
  payflowBillingService: PayflowBillingService;

  constructor(studyBillingService: StudyBillingPlanService,
              userService: UserService,
              subscriptionService: SubscriptionService,
              payflowBillingService: PayflowBillingService) {
    this.studyBillingService = studyBillingService;
    this.userService = userService;
    this.subscriptionService = subscriptionService;
    this.payflowBillingService = payflowBillingService;
  }

  async payflowCreateRecurringPlan(request: Request, reply: Function) {
    try {
      const { payload } = request;
      const { credentials } = request.auth;
      
      const result = await this.payflowBillingService.create(payload);
      let statusCode = CREATED;

      if (result.response.decoded.RESPMSG.toLowerCase() === "approved") {
        //update user to study role
        const role = await Role.where({ name: 'Study User' }).fetch();
        this.userService.changeRole(credentials.id, role);
        
        //save paypal credentials
        await this.subscriptionService.createPayflowProfile(credentials.id, 
          'study',
          result.response.decoded.PROFILEID);
      } else {
        statusCode = PRECONDITION_FAILED;
      }

      reply().statusCode = statusCode;
    } catch (error) {
      reply (error);
    }
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
      await this.subscriptionService.create(user, 'study', result.agreement);
      reply().statusCode = NO_CONTENT;
    } catch (error) {
      reply(error);
    }
  }

  async cancelStudyBillingPlan(request: Request, reply: Function) {
    try {
      const { credentials } = request.auth;

      //update paypal credentials
      const user = await this.userService.get({id: credentials.id});
      const subscription = user.related('subscription');
      const billingAgreement = subscription.get('billingAgreement');
      const payflowProfileId = subscription.get('payflowProfileId');

      await this.subscriptionService.cancel(user, subscription);

      if (billingAgreement !== undefined)
        await this.studyBillingService.cancelStudyBillingPlan(credentials, billingAgreement);

      if (payflowProfileId !== undefined)
        await this.payflowBillingService.cancel(payflowProfileId);

      const role = await Role.where({name: 'General User'}).fetch();
      this.userService.changeRole(credentials.id, role);
      reply().statusCode = NO_CONTENT;
    } catch (error) {
      reply(error);
    }
  }
}

//@flow
/*import { stub } from 'sinon';
import PaymentController from 'payment/controllers/PaymentController';
import type StudyBillingPlanService from 'payment/service/StudyBillingPlanService';
import type UserService from 'users/service/UserService';
import type { Role } from 'security/authorization/models/Role';
import type SubscriptionService from 'subscriptions/services/SubscriptionService';
import { CREATED } from 'http/status-codes';

describe('PaymentController', () => {
  const request = {query:{}, params:{}};

  describe('process study billing plan', () => {
    describe('when the billing plan was created', () => {
      const userService = new UserService();
      const studyBillingService = new StudyBillingPlanService();
      const subscriptionService = new SubscriptionService();
      const controller = new PaymentController(studyBillingService, userService, subscriptionService);
      const response = {};
      const plan = {};
      const reply = stub().returns(response);

      before(async () => {
        stub(service, 'processStudyBillingPlan').returns(Promise.resolve(plan));
        await controller.processStudyBillingPlan(request, reply);
      });

      it('replies with the newly created plan model', () => {
        expect(reply).to.have.been.calledWith(plan);
      });
    });
  });

});*/
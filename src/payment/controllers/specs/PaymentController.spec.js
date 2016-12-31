import { stub } from 'sinon';
import StudyBillingPlanService from 'payment/service/StudyBillingPlanService';
import UserService from 'users/service/UserService';
import SubscriptionService from 'subscriptions/services/SubscriptionService';
import PaymentController from 'payment/controllers/PaymentController';
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
      const agreement = {};
      const reply = stub().returns(response);

      before(async () => {
        stub(studyBillingService, 'create').returns(Promise.resolve(plan));
        stub(studyBillingService, 'process').returns(Promise.resolve(agreement));
        await controller.processStudyBillingPlan(request, reply);
      });

      it('replies with the newly created plan model', () => {
        expect(reply).to.have.been.calledWith(plan);
      });

      it('sets the status code of the reply to created', () => {
        expect(response.statusCode).to.equal(CREATED);
      });
    });
  });

});
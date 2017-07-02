import { stub } from 'sinon';
import StudyBillingPlanService from 'payment/service/StudyBillingPlanService';
import PayflowBillingService from 'payment/service/PayflowBillingService';
import UserService from 'users/service/UserService';
import SubscriptionService from 'subscriptions/services/SubscriptionService';
import PaymentController from 'payment/controllers/PaymentController';
import { CREATED } from 'http/status-codes';

describe('PaymentController', () => {
  const request = {query:{}, params:{}};

  describe('process study billing plan', () => {
      const userService = new UserService();
      const studyBillingService = new StudyBillingPlanService();
      const subscriptionService = new SubscriptionService();
      const payflowBillingService = new PayflowBillingService();
      const controller = new PaymentController(studyBillingService, userService, 
        subscriptionService, payflowBillingService);

    describe('when the billing plan was created', () => {
      let response = {};
      let plan = {};
      let agreement = {};
      let reply = stub().returns(response);

      before(async () => {
        stub(studyBillingService, 'create').returns(Promise.resolve(plan));
        stub(studyBillingService, 'process').returns(Promise.resolve(agreement));
        await controller.processStudyBillingPlan(request, reply);
      });

      it('delegates to the create action of the StudyBillingService', () => {
          expect(studyBillingService.create).to.have.been.called;
        });

      it('replies with the newly created plan model', () => {
        expect(studyBillingService.process).to.have.been.calledWith(plan);
      });

      it('sets the status code of the reply to created', () => {
        expect(response.statusCode).to.equal(CREATED);
      });
    });
  });

});
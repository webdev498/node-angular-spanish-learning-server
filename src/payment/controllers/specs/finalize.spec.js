import { stub } from 'sinon';
import StudyBillingPlanService from 'payment/service/StudyBillingPlanService';
import PayflowBillingService from 'payment/service/PayflowBillingService';
import UserService from 'users/service/UserService';
import SubscriptionService from 'subscriptions/services/SubscriptionService';
import PaymentController from 'payment/controllers/PaymentController';

describe('PaymentController', () => {
    const request = {
    payload: { token:'abc@abc.com'},
    params: {id: '2903'},
    auth: {}
  };

  describe('finalize study billing plan', () => {
      const userService = new UserService();
      const studyBillingService = new StudyBillingPlanService();
      const subscriptionService = new SubscriptionService();
      const payflowBillingService = new PayflowBillingService();
      const controller = new PaymentController(studyBillingService, userService, 
        subscriptionService, payflowBillingService);

      describe('when the billing process was finalized', () => {
        let subscription = {};
        let user = {};
        let agreementResult = {};
        let response = {};
        const reply = stub().returns(response);

        before(async () => {
          stub(studyBillingService, 'finalizeStudy').returns(Promise.resolve(agreementResult));
          stub(userService, 'changeRole').returns(Promise.resolve(user));
          stub(subscriptionService, 'create').returns(Promise.resolve(subscription));
          await controller.finalizeStudy(request, reply);
        });

        it('delegates to the finalize action of the StudyBillingService', () => {
          expect(studyBillingService.finalizeStudy).to.have.been.called;
        });

        it('replies to the user', () => {
          expect(reply).to.have.been.called;
        });
      });
  });
});
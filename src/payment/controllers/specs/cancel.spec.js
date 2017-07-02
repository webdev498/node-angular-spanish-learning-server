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
    auth: {id: '2903'}
  };

  describe('cancels study billing plan', () => {
      const userService = new UserService();
      const studyBillingService = new StudyBillingPlanService();
      const payflowBillingService = new PayflowBillingService();
      const subscriptionService = new SubscriptionService();
      const controller = new PaymentController(studyBillingService, userService, 
        subscriptionService, payflowBillingService);

      describe('when the billing process was cancelled', () => {
        let user = {};
        let subscription = {};
        let agreementResult = {};
        let response = {};
        const reply = stub().returns(response);

        before(async () => {
          stub(subscriptionService, 'cancel').returns(Promise.resolve(subscription));
          stub(studyBillingService, 'cancelStudyBillingPlan').returns(Promise.resolve(agreementResult));
          stub(payflowBillingService, 'cancel').returns(Promise.resolve());
          stub(userService, 'changeRole').returns(Promise.resolve(user));
          await controller.cancelStudyBillingPlan(request, reply);
        });

        it('replies to the user', () => {
          expect(reply).to.have.been.called;
        });
      });
  });
});
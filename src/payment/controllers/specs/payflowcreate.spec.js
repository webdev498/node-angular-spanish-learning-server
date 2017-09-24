import { stub } from 'sinon';
import PayflowBillingService from 'payment/service/PayflowBillingService';
import StudyBillingPlanService from 'payment/service/StudyBillingPlanService';
import UserService from 'users/service/UserService';
import SubscriptionService from 'subscriptions/services/SubscriptionService';
import PaymentController from 'payment/controllers/PaymentController';
import CRMService from 'users/service/CRMService';
import { CREATED } from 'http/status-codes';

describe('PaymentController', () => {
    const request = { query: {}, params: {} };

    describe('process study billing plan', () => {
        const userService = new UserService();
        const payflowBillingService = new PayflowBillingService();
        const studyBillingService = new StudyBillingPlanService();
        const subscriptionService = new SubscriptionService();
        const crmService = new CRMService();
        const controller = new PaymentController(studyBillingService, userService, 
            subscriptionService, payflowBillingService, crmService);

        describe('when the billing plan was created', () => {
            let response = {};
            let data = {};
            let user = {};
            let profile = {};
            let reply = stub().returns(response);

            before(async () => {
                stub(payflowBillingService, 'create').returns(Promise.resolve(data));
                stub(subscriptionService, 'createPayflowProfile').returns(Promise.resolve(profile));
                stub(userService, 'changeRole').returns(Promise.resolve(user));
                stub(crmService,'studyUserProcessed').returns(null);
                await controller.payflowCreateRecurringPlan(request, reply);
            });

            /*it('delegates to the create action of the PayflowBillingService', () => {
                expect(payflowBillingService.create).to.have.been.called;
            });

            it('sets the status code of the reply to created', () => {
                expect(response.statusCode).to.equal(CREATED);
            });*/
        });
    });

});
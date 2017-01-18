//@flow
import Router from 'http/Router';
import PaymentController from 'payment/controllers/PaymentController';
import StudyBillingPlanService from 'payment/service/StudyBillingPlanService';
import SubscriptionService from 'subscriptions/services/SubscriptionService';
import UserService from 'users/service/UserService';
import type { Server } from 'http/index';

export const register = (server: Server, options: Object, next: Function) => {
  const router = new Router({server, resource: 'payments'});
  const paymentController = new PaymentController(new StudyBillingPlanService(),
    new UserService(), new SubscriptionService());

  router
    .post('study/process')
    .authorize('urn:cgi:permission:paymentstudyprocess::create')
    .bind(paymentController,'processStudyBillingPlan');

   router
    .post('study/finalize')
    .authorize('urn:cgi:permission:paymentstudyfinalize::create')
    .bind(paymentController,'finalizeStudy');

   router
    .post('study/cancel')
    .authorize('urn:cgi:permission:paymentstudycancel::create')
    .bind(paymentController,'cancelStudyBillingPlan');

  router.register(next);
};

register.attributes = {
  name: 'CGI Payments Service',
  version: '0.0.1'
};

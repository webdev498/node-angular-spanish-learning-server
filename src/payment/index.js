//@flow
import Router from 'http/Router';
import ExaminationsController from './controllers/PaymentController';
import BillingPlanService from './service/BillingPlanService';
import type { Server } from 'http/index';

export const register = (server: Server, options: Object, next: Function) => {
  const router = new Router({server, resource: 'payments'});
  const paymentController = new PaymentController(new BillingPlanService());

  router
    .post('study/process')
    .authorize('urn:cgi:permission:paymentsstudyprocess::create')
    .bind(paymentController,'processBillingPlan');

   router
    .post('study/finalize')
    .authorize('urn:cgi:permission:examfeedback::create')
    .bind(paymentController,'finalize');

  router.register(next);
};

register.attributes = {
  name: 'CGI Payments Service',
  version: '0.0.1'
};

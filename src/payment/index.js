//@flow
import Router from 'http/Router';
import ExaminationsController from './controllers/PaymentController';
import BillingPlanService from './service/BillingPlanService';
import type { Server } from 'http/index';

export const register = (server: Server, options: Object, next: Function) => {
  const router = new Router({server, resource: 'payments'});
  const paymentController = new PaymentController(new BillingPlanService());

  router
    .post('study')
    .authorize('urn:cgi:permission:paymentsstudybilling::create')
    .bind(examsController, 'createBillingPlan');

  router
    .post('study/process')
    .authorize('urn:cgi:permission:paymentsstudyprocess::create')
    .bind(examsController,'processBillingPlan');

  router.register(next);
};

register.attributes = {
  name: 'CGI Payments Service',
  version: '0.0.1'
};

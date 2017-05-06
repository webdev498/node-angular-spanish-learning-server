//@flow
import Router from 'http/Router';
import HealthService from './service/HealthService';
import SystemController from './controllers/SystemController';
import type { Server } from 'http/index';

export const register = (server: Server, options: Object, next: Function) => {
  const router = new Router({ server, resource: 'system' });
  const controller = new SystemController(new HealthService());

  router
    .get('health-check')
    .bind(controller, 'checkApplicationHealth');

  router.register(next);
};

register.attributes = {
  name: 'CGI System Service',
  version: '0.0.1'
};

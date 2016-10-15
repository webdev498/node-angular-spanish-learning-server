/* @flow */

import Router from 'http/Router';
import TerminologyController from './controllers/TerminologyController';
import TerminologyService from './service/TerminologyService';
import type { Server } from 'http/index';

export const register = (server: Server, options: Object, next: Function) => {
  const controller = new TerminologyController(new TerminologyService());
  const router = new Router({server, resource: 'terms'});

  router
    .post('/exclusions')
    .authorize('urn:cgi:permission:term-exclusions::create')
    .bind(controller, 'exclude');

  router
    .get('/')
    .authorize('urn:cgi:permission:terms::list')
    .bind(controller, 'list');

  router
    .get('/{languageName}')
    .authorize('urn:cgi:permission:terms::list')
    .bind(controller, 'listByName');

  router.register(next);
};

register.attributes = {
  name: 'Terminology resource service',
  version: '0.0.1'
};

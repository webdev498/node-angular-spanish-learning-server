/* @flow */

import Router from 'cgihttp/Router';
import TerminologyController from './controllers/TerminologyController';
import TerminologyService from './service/TerminologyService';
import type { Server } from 'cgihttp/index';

const name = 'Terminology resource service';
const version = '0.0.1';

export const register = (server: Server, options: Object, next: Function) => {
  const controller = new TerminologyController(new TerminologyService());
  const router = new Router(server);

  router
    .post()
    .to('/terms/exclusions')
    .authorize('urn:cgi:permission:term-exclusions::create')
    .bind(controller, 'exclude');

  router
    .get()
    .to('/terms')
    .authorize('urn:cgi:permission:terms::list')
    .bind(controller, 'list');

  router
    .get()
    .to('/terms/{languageName}')
    .authorize('urn:cgi:permission:terms::list')
    .bind(controller, 'listByName');

  router.register(next);
};

register.attributes = {
  name,
  version
};

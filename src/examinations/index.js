//@flow
import Router from 'http/Router';
import ExaminationsController from './controllers/ExaminationsController';
import ExaminationService from './services/ExaminationService';
import UserService from 'users/service/UserService';
import type { Server } from 'http/index';

export const register = (server: Server, options: Object, next: Function) => {
  const router = new Router({server, resource: 'exams'});
  const controller = new ExaminationsController(new ExaminationService(new UserService()));

  router
    .post('')
    .authorize('urn:cgi:permission:examinations::create')
    .bind(controller, 'create');

  router
    .post('feedback')
    .authorize('urn:cgi:permission:examfeedback::create')
    .bind(controller,'feedback');

  router
    .post('{id}/users/{userId}/submissions')
    .authorize('urn:cgi:permission:examination-submissions::create')
    .bind(controller, 'submit');

  router.register(next);
};

register.attributes = {
  name: 'CGI Examination Service',
  version: '0.0.1'
};

import { Router } from 'express';
import Controller from './../../controllers/Examinations';

export default (application, router = Router()) => {
  const controller = new Controller(application);

  let { show, create, grade } = controller;

  router.get('/:id', show.bind(controller));
  router.post('/', create.bind(controller));
  router.put('/:id/evaluate', grade.bind(controller));

  return router;
};

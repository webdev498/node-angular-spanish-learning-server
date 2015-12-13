import { Router } from 'express';
import Controller from './../../controllers/Questions';

export default (application, router = Router()) => {

  let controller = new Controller(application);
  let { show, create, update, list } = controller;

  router.get('/', list.bind(controller));
  router.post('/', create.bind(controller));
  router.put('/:id', update.bind(controller));

  return router;
};

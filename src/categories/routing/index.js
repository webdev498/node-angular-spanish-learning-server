import { create, all, remove, update } from './../controllers/';

export default (server) => {

  server.route({
    method: 'POST',
    path: '/categories',
    handler: create
  });

  server.route({
    method: 'GET',
    path: '/categories',
    handler: all
  });

  server.route({
    method: 'DELETE',
    path: '/categories/{id}',
    handler: remove
  });

  server.route({
    method: 'PUT',
    path: '/categories/{id}',
    handler: update
  });
};

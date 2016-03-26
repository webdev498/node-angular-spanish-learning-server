import { create, list, update } from './../controllers/';

export default server => {

  server.route({
    method: 'POST',
    path: '/users',
    handler: create
  });

  server.route({
    method: 'GET',
    path: '/users',
    handler: list
  });

  server.route({
    method: 'PUT',
    path: '/users/{id}',
    handler: update
  });

};

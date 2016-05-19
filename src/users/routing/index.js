import { create, list, update, get } from './../controllers/';

export default (server) => {

  server.route({
    method: 'POST',
    path: '/users',
    config: {
      auth: false,
      handler: create
    }
  });

  server.route({
    method: 'GET',
    path: '/users',
    handler: list
  });

  server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: get
  });

  server.route({
    method: 'PUT',
    path: '/users/{id}',
    handler: update
  });

};

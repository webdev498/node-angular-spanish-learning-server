import { create, update, list } from './../controllers/';

export default server => {

  server.route({
    method: 'POST',
    path: '/choices',
    handler: create
  });

  server.route({
    method: 'PUT',
    path: '/choices/{id}',
    handler: update
  });

  server.route({
    method: 'GET',
    path: '/choices',
    handler: list
  });

};

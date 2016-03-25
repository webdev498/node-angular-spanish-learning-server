import { create, all } from './../controllers/';

export default server => {

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
};

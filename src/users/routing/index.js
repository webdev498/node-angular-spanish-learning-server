import { create, list } from './../controllers/';

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

};

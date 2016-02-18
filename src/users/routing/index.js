import { create } from './../controllers/';

export default (server) => {

  server.route({
    method: 'POST',
    path: '/users',
    handler: create
  });

};

import { create } from './../controllers/';

export default server => {

  server.route({
    method: 'POST',
    path: '/categories',
    handler: create
  });
};

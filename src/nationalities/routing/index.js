import { list } from './../controllers/';

export default (server) => {
  server.route({
    method: 'GET',
    path: '/nationalities',
    handler: list
  });

};

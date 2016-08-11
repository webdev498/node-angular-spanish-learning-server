import { list } from './../controllers/';

export default (server) => {
  server.route({
    method: 'GET',
    path: '/nationalities',
    handler: list,
    config: {
      auth: false,
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:nationalities::list'
        }
      }
    }
  });

};

import { create, update, list } from './../controllers/';

export default (server) => {

  server.route({
    method: 'POST',
    path: '/choices',
    handler: create,
    config: {
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:choices::create'
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/choices/{id}',
    handler: update,
    config: {
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:choices::update'
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/choices',
    handler: list,
    config: {
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:choices::list'
        }
      }
    }
  });

};

import { create, list, update, get } from './../controllers/';

export default (server) => {

  server.route({
    method: 'POST',
    path: '/users',
    handler: create,
    config: {
      auth: false,
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:users::create'
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/users',
    handler: list,
    config: {
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:users::list'
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: get,
    config: {
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:users::view'
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/users/{id}',
    handler: update,
    config: {
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:users::update'
        }
      }
    }
  });

};

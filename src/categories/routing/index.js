import { create, all, remove, update } from './../controllers/';

export default (server) => {

  server.route({
    method: 'POST',
    path: '/categories',
    handler: create,
    config: {
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:categories::create'
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/categories',
    handler: all,
    config: {
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:categories::view'
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/categories/{id}',
    handler: remove,
    config: {
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:categories::delete'
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/categories/{id}',
    handler: update,
    config: {
      plugins: {
        AuthorizationMiddleware: {
          permission: 'urn:cgi:permission:categories::update'
        }
      }
    }
  });
};

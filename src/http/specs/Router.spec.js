import Router, { Route } from '../Router';
import { GET, PUT, PATCH, POST, DELETE, HEAD, OPTIONS } from 'http/methods';
import Server from '../../Server';
import { expect } from 'chai';

describe('Request Router', () => {
    const router = new Router(new Server());

    describe('when registering a GET request', () => {
      it('returns back a new route with a method of GET', () => {
        expect(router.get()).to.have.property('method', GET);
      });
    });

   describe('when registering a PUT request', () => {
       it('returns back a new route with a method of PUT', () => {
        expect(router.put()).to.have.property('method', PUT);
      });
   });

   describe('when registering a POST request', () => {
       it('returns back a new route with a method of PUT', () => {
        expect(router.post()).to.have.property('method', POST);
      });
   });

   describe('when registering a DELETE request', () => {
       it('returns back a new route with a method of PUT', () => {
        expect(router.delete()).to.have.property('method', DELETE);
      });
   });

   describe('when registering a PATCH request', () => {
       it('returns back a new route with a method of PUT', () => {
        expect(router.patch()).to.have.property('method', PATCH);
      });
   });

   describe('when registering a HEAD request', () => {
       it('returns back a new route with a method of PUT', () => {
        expect(router.head()).to.have.property('method', HEAD);
      });
   });

   describe('when registering a OPTIONS request', () => {
       it('returns back a new route with a method of PUT', () => {
        expect(router.options()).to.have.property('method', OPTIONS);
      });
   });
});


describe('Request Route', () => {
  describe('setting the request path', () => {
    const path = 'to/someplace';
    const route = new Route('GET').to(path);

    it('sets the "path" property on the instance', () => {
      expect(route).to.have.property('path', path);
    });
  });

  describe('binding the request handler', () => {
    const controller = { method: () => {} };
    const route = new Route('GET').bind(controller, 'method');

    it('sets the handler property on the instance', () => {
      expect(route).to.have.property('handler');
    });
  });



  describe('setting authorization', () => {
    const permission = 'urn:cgi:permissions:user::create';
    const route = new Route('GET').authorize(permission);

    it('configures the authorization middleware for the route', () => {
      expect(route.config).to.deep.equal({
        plugins: {
          AuthorizationMiddleware: {
            permission
          }
        }
      });
    });
  });
});

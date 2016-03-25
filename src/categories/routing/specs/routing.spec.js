import router from './../';
import * as Controller from './../../controllers';

import { spy } from 'sinon';
import { expect } from 'chai';

describe('routing for categories service', () => {
  let server = {};

  describe('POST /categories', () => {
    let routeCall;

    beforeEach(() => {
      server.route = spy();
      router(server);
      routeCall = server.route.args[0][0];
    });

    it('routes requests to the "create" action on the categories controller', () => {
      expect(routeCall.handler).to.equal(Controller.create);
    });

    it('registers the path of "/categories"', () => {
      expect(routeCall.path).to.equal('/categories');
    });

    it('registers a POST method', () => {
      expect(routeCall.method).to.equal('POST');
    });
  });

  describe('GET /categories', () => {
    let routeCall;

    beforeEach(() => {
      server.route = spy();
      router(server);
      routeCall = server.route.args[1][0];
    });

    it('routes requests to the "create" action on the categories controller', () => {
      expect(routeCall.handler).to.equal(Controller.all);
    });

    it('registers the path of "/categories"', () => {
      expect(routeCall.path).to.equal('/categories');
    });

    it('registers a POST method', () => {
      expect(routeCall.method).to.equal('GET');
    });
  });

  describe('DELETE /categories', () => {
    let routeCall;

    beforeEach(() => {
      server.route = spy();
      router(server);
      routeCall = server.route.args[2][0];
    });

    it('routes requests to the "create" action on the categories controller', () => {
      expect(routeCall.handler).to.equal(Controller.remove);
    });

    it('registers the path of "/categories"', () => {
      expect(routeCall.path).to.equal('/categories/{id}');
    });

    it('registers a POST method', () => {
      expect(routeCall.method).to.equal('DELETE');
    });
  });

});

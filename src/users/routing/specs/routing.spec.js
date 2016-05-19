import { expect } from 'chai';
import { spy } from 'sinon';
import { create, list, get } from './../../controllers';
import router from './../';

describe('User service routing', () => {
  let server = {};
  describe('POST /users', () => {
    before(() => {
      server.route = spy();
      router(server);
    });
    it("registers the controller's create function as the handler", () => {
      expect(server.route).to.have.been.calledWith({
        method: 'POST',
        path: '/users',
        config: {
          auth: false,
          handler: create
        }
      });
    });
  });

  describe('GET /users', () => {
    before(() => {
      server.route = spy();
      router(server);
    });
    it("registers the controller's list function as the handler", () => {
      expect(server.route).to.have.been.calledWith({
        method: 'GET',
        path: '/users',
        handler: list
      });
    });
  });

  describe('GET /users/:id', () => {
    before(() => {
      server.route = spy();
      router(server);
    });
    it("registers the controller's get function as the handler", () => {
      expect(server.route).to.have.been.calledWith({
        method: 'GET',
        path: '/users/{id}',
        handler: get
      });
    });
  });
});

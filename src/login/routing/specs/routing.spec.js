import { expect } from 'chai';
import { spy } from 'sinon';
import { login, oAuthLogin } from './../../controllers';
import router from './../';

describe('Login service routing', () => {
  let server = {};
  describe('POST /login', () => {
    before(() => {
      server.route = spy();
      router(server);
    });
    it("registers the controller's create function as the handler", () => {
      expect(server.route).to.have.been.calledWith({
        method: 'POST',
        path: '/login',
        config: {
          auth: false,
          handler: login
        }
      });
    });
  });

  describe('GET /login/facebook', () => {
    before(() => {
      server.route = spy();
      router(server);
    });
    it("registers the controller's create function as the handler", () => {
      expect(server.route).to.have.been.calledWith({
        method: 'GET',
        path: '/login/facebook',
        config: {
          auth: 'facebook',
          handler: oAuthLogin
        }
      });
    });
  });

  describe('GET /login/google', () => {
    before(() => {
      server.route = spy();
      router(server);
    });
    it("registers the controller's create function as the handler", () => {
      expect(server.route).to.have.been.calledWith({
        method: 'GET',
        path: '/login/google',
        config: {
          auth: 'google',
          handler: oAuthLogin
        }
      });
    });
  });

});

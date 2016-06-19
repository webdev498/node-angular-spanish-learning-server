import { expect } from 'chai';
import { spy } from 'sinon';
import { login, googleAuthLogin, facebookAuthLogin } from './../../controllers';
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
        handler: login,
        config: {
          auth: false
        }
      });
    });
  });

  describe('POST /login/facebook', () => {
    before(() => {
      server.route = spy();
      router(server);
    });
    it("registers the controller's create function as the handler", () => {
      expect(server.route).to.have.been.calledWith({
        method: 'POST',
        path: '/login/facebook',
        handler: facebookAuthLogin,
        config: {
          auth: false
        }
      });
    });
  });

  describe('POST /login/google', () => {
    before(() => {
      server.route = spy();
      router(server);
    });
    it("registers the controller's create function as the handler", () => {
      expect(server.route).to.have.been.calledWith({
        method: 'POST',
        path: '/login/google',
        handler: googleAuthLogin,
        config: {
          auth: false
        }
      });
    });
  });

});

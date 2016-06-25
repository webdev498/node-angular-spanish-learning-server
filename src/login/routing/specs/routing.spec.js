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
        config: {
          auth: false,
          handler: login
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
        config: {
          auth: false,
          handler: facebookAuthLogin
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
        config: {
          auth: false,
          handler: googleAuthLogin
        }
      });
    });
  });

});

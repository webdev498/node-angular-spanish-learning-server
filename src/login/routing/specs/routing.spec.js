import { expect } from 'chai';
import { spy } from 'sinon';
import { login } from './../../controllers';
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
        handler: login
      });
    });
  });
});

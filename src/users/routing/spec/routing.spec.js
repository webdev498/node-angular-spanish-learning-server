import { expect } from 'chai';
import { spy } from 'sinon';
import { create } from './../../controllers';
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
        handler: create
      });
    });
  });
});

import { expect } from 'chai';
import { spy } from 'sinon';
import { create } from './../../controllers';
import router from './../';

describe('Choice service routing', () => {
  let server = {};
  describe('POST /choices', () => {
    before(() => {
      server.route = spy();
      router(server);
    });
    it("registers the controller's create function as the handler", () => {
      expect(server.route).to.have.been.calledWith({
        method: 'POST',
        path: '/choices',
        handler: create,
        config: {
          plugins: {
            AuthorizationMiddleware: {
              permission: 'urn:cgi:permission:choices::create'
            }
          }
        }
      });
    });
  });
});

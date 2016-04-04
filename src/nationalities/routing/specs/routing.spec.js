import { expect } from 'chai';
import { spy } from 'sinon';
import { list } from './../../controllers';
import router from './../';

describe('Nationality service routing', () => {
  let server = {};

  describe('GET /nationalities', () => {
    before(() => {
      server.route = spy();
      router(server);
    });
    it("registers the controller's list function as the handler", () => {
      expect(server.route).to.have.been.calledWith({
        method: 'GET',
        path: '/nationalities',
        handler: list
      });
    });
  });
});

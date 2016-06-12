import { expect } from 'chai';
import { spy } from 'sinon';
import FacebookProvider from './../facebookProvider';

describe('facebook provider', () => {
  describe('static build client', () => {
    beforeEach(() => {
      spy(FacebookProvider, 'build');
    });

    afterEach(() => {
      FacebookProvider.build.restore();
    });

    let client = {};

    it('static build returns new Provider with client', () => {
      let provider = FacebookProvider.build(client);
      expect(FacebookProvider.build).to.be.calledWith(client);
      expect(provider.client).to.equal(client);
    });
  });

  describe('getProfile', () => {
    describe('getToken is successful', () => {
      const profile = { name: 'Test', email: 'test@test.com' };
      const client = { getToken: () => { return profile; } };

      it('returns user profile', () => {
        let provider = FacebookProvider.build(client);
        provider.getProfile('abc').then((result) => { expect(result).to.equal(profile); });
      });
    });
  });
});
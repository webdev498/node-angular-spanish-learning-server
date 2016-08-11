import { expect } from 'chai';
import { spy } from 'sinon';
import GoogleProvider from './../googleProvider';

describe('google provider', () => {
  describe('static build client', () => {
    beforeEach(() => {
      spy(GoogleProvider, 'build');
    });

    afterEach(() => {
      GoogleProvider.build.restore();
    });

    let client = {};

    it('static build returns new Provider with client', () => {
      let provider = GoogleProvider.build(client);
      expect(GoogleProvider.build).to.be.calledWith(client);
      expect(provider.client).to.equal(client);
    });
  });

  describe('getProfile', () => {
    describe('getToken is successful', () => {
      const profile = { name: 'Test', email: 'test@test.com' };
      const client = { getToken: () => { return profile; } };

      it('returns user profile', () => {
        let provider = GoogleProvider.build(client);
        provider.getProfile('abc').then((result) => { expect(result).to.equal(profile); });
      });
    });
  });
});
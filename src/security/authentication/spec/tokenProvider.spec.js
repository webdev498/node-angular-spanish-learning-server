import { expect } from 'chai';
import { stub } from 'sinon';
import TokenProvider from './../TokenProvider';
import jwt from 'jsonwebtoken';

describe('token provider', () => {
  const provider = new TokenProvider();

  describe('signing a payload', () => {
    before(async () => {
      stub(jwt, 'sign').yields('token');
      await provider.sign({test: 'payload'});
    });

    after(() => {
      jwt.sign.restore();
    });

    it('delegates to the sign method on the jsonwebtoken collaborator', () => {
      expect(jwt.sign).to.have.been.called;
    });
  });
});

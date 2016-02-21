import { expect } from 'chai';
import { stub } from 'sinon';
import * as TokenProvider from './../tokenProvider';
import jwt from 'jsonwebtoken';

describe('token provider', () => {

  describe('signing a payload', () => {
    before(() => {
      stub(jwt, 'sign', (payload, secret, options, callback) => {
        callback('token');
      });
    });

    after(() => {
      jwt.sign.restore();
    });

    it('delegates to the sign method on the jsonwebtoken collaborator', (done) => {
      TokenProvider.sign({test: 'payload'}).then(
        () => {
          expect(jwt.sign).to.have.been.called;
          done();
        },
        () => {
          done();
        }
      );
    });
  });
});

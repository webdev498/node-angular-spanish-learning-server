import { expect } from 'chai';
import { stub } from 'sinon';
import * as TokenProvider from './../tokenProvider';
import * as UserService from './../../users/service'
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
      TokenProvider.sign({ test: 'payload' }).then(
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

  describe('jwtAuthOptions validate', () => {
    let getStub, userDouble, decodedToken, request, callback;
    before(() => {
      decodedToken = { id: '1' };
      getStub = stub(UserService, 'get');
      callback = (err, valid) => { };
    });

    after(() => {
      UserService.get.restore();
    });


    describe('user is active', () => {
      before(() => {
        userDouble = { id: '1', active: true };
        getStub.returns(Promise.resolve(userDouble));

      });

      after(() => {
        UserService.get.reset();
      });

      it('returns callback true', () => expect(TokenProvider.jwtAuthOptions
        .validateFunc(decodedToken, request, callback)).to.equal(callback(null, true)));
    });

    describe('user is not active', () => {
      before(() => {
        userDouble = { id: '1', active: false };
        getStub.returns(Promise.resolve(userDouble));
      });

      after(() => {
        UserService.get.reset();
      });

      it('returns callback false', () => expect(TokenProvider.jwtAuthOptions
        .validateFunc(decodedToken, request, callback)).to.equal(callback(null, false)));
    });

    describe('user is not found', () => {
      before(() => {
        getStub.returns(Promise.resolve(null));
      });

      after(() => {
        UserService.get.reset();
      });

      it('returns callback false', () => expect(TokenProvider.jwtAuthOptions
        .validateFunc(decodedToken, request, callback)).to.equal(callback(null, false)));
    });
  });
});

import { expect } from 'chai';
import { spy, stub } from 'sinon';
import * as UserService from './../../service';
import * as TokenProvider from './../../../authentication/tokenProvider';
import * as ServiceErrorFactory from './../../../exceptions/Factory';
import * as Controller from './../';

describe('user controller actions', () => {
  let reply, request, userDouble, sanitizedUser, signupStub, tokenProviderStub, error, token = '123abc';

  before(() => {
    reply = spy();
    request = { payload: {firstName: 'fn', lastName: 'ln', password:'pwd', confirmPassword: 'cpwd', email:'abc@abc.com'} };
    userDouble = {sanitize: () => {}};
    sanitizedUser = {};
    tokenProviderStub = stub(TokenProvider, 'sign');
    signupStub = stub(UserService, 'signup');
  });

  after(() => {
    TokenProvider.sign.restore();
    UserService.signup.restore();
  });

  describe('creating a new user', () => {
    describe('when signup is successful', () => {

      before(() => {
        stub(userDouble, 'sanitize').returns(sanitizedUser);
        signupStub.returns(Promise.resolve(userDouble));
        tokenProviderStub.returns(Promise.resolve(token));
        Controller.create(request, reply);
      });

      after(() => {
        UserService.signup.reset();
        TokenProvider.sign.reset();
      });

      it('delegates to the signup action of the UserService', () => {
        expect(UserService.signup).to.have.been.called;
      });

      it('passes the user to the token service to be signed', () => {
        expect(TokenProvider.sign).to.have.been.calledWith(sanitizedUser);
      });

      it('invokes the reply method provided by the route with a JWT token representing the user', () => {
        expect(reply).to.have.been.calledWith({ token });
      });
    });

    describe('when the signup is not successful', () => {
      before(() => {
        error = new Error();
        stub(ServiceErrorFactory, 'create').returns(error);
        signupStub.returns(Promise.reject(error));
        Controller.create(request, reply);
      });

      after(() => {
          UserService.signup.reset();
          TokenProvider.sign.reset();
          ServiceErrorFactory.create.restore();
      });

      it('does not delegate to the token provider', () => {
        expect(TokenProvider.sign).not.to.have.been.called;
      });

      it('invokes the reply method provided by the router with the error', () => {
        expect(reply).to.have.been.calledWith(error);
      });

    });
  });
});

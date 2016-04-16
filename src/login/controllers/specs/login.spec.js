import { expect } from 'chai';
import { spy, stub } from 'sinon';
import * as UserService from './../../../users/service';
import * as TokenProvider from './../../../authentication/tokenProvider';
import * as ServiceErrorFactory from './../../../exceptions/Factory';
import * as Controller from './../';
import { OK, UNAUTHORIZED } from './../../../http/statusCodes';

describe('Login controller', () => {
  let reply, request, userDouble, getStub, tokenProviderStub, response;

  before(() => {
    reply = spy();
    request = { payload: { email: 'test@test.com', password: 'test' } };
    userDouble = { validatePassword: () => {}, sanitize: () => {} }
    getStub = stub(UserService, 'getByEmail');
    tokenProviderStub = stub(TokenProvider, 'sign');
  });

  after(() => {
    TokenProvider.sign.restore();
    UserService.getByEmail.restore();
  });

  describe('login in with email and password', () => {
    describe('when database operation is successful', () => {
      describe('when user is authenticated', () => {
        before(() => {
          response = {token: "123"};
          tokenProviderStub.returns(Promise.resolve("123"));
          userDouble.validatePassword = stub().returns(true);
          userDouble.sanitize = stub().returns(userDouble);
          getStub.returns(Promise.resolve(userDouble));
          return Controller.login(request, reply);
        });

        after(() => {
          UserService.getByEmail.reset();
          TokenProvider.sign.reset();
        });

        it('delegates to the get action of the UserService', () => expect(UserService.getByEmail).to.have.been.called);
        it('passes the user to the token service to be signed', () => { expect(TokenProvider.sign).to.have.been.calledWith(userDouble); });
        it('replies with the a token', () => expect(reply).to.have.been.calledWith(response));
      });
      
      describe('when user is not found by email', () => {  
        let serviceError = { statusCode: UNAUTHORIZED };      
        before(() => {
          response = ({ authenticated:false });
          userDouble.validatePassword = stub().returns(false);
          getStub.returns(Promise.resolve(null));
          reply = stub().returns(response);
          return Controller.login(request, reply);
        });

        after(() => {
          UserService.getByEmail.reset();
        });
        
        it('delegates to the get action of the UserService', () => expect(UserService.getByEmail).to.have.been.called);
        it('sets the status code on the response to Unauthorized 401', () => expect(response.statusCode).to.equal(serviceError.statusCode));
      })
      
      describe('when user authentication fails', () => {
        let serviceError = { statusCode: UNAUTHORIZED };
        before(() => {
          response = ({ authenticated:false });
          userDouble.validatePassword = stub().returns(false);
          getStub.returns(Promise.resolve(userDouble));
          reply = stub().returns(response);
          return Controller.login(request, reply);
        });

        after(() => {
          UserService.getByEmail.reset();
        });
        
        it('delegates to the get action of the UserService', () => expect(UserService.getByEmail).to.have.been.called);
        it('sets the status code on the response to Unauthorized 401', () => expect(response.statusCode).to.equal(serviceError.statusCode));
      })
    });

    describe('when the login is not successful', () => {
      let error;
      before(() => {
        reply = stub().returns({});
        error = { statusCode: OK };
        stub(ServiceErrorFactory, 'create').returns(error);
        getStub.returns(Promise.reject({}));
        return Controller.login(request, reply);
      });

      after(() => {
        UserService.getByEmail.reset();
        ServiceErrorFactory.create.restore();
      });

      it('invokes the reply method provided by the router with the error', () => {
        expect(reply).to.have.been.calledWith(error);
      });

    });
  });
});

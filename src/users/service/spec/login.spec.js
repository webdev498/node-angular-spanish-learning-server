import { stub } from 'sinon';
import UserService from 'users/service/UserService';
import AuditService from 'auditing/service/AuditService';
import CRMService from 'users/service/CRMService';
import TokenProvider from 'security/authentication/TokenProvider';
import LoginService from '../LoginService';
import AuthenticationError from '../../exceptions/AuthenticationError';

describe('Login Service', () => {
  const userDouble = { validatePassword: () => { }, sanitize: () => { } };
  const email = 'test@test.com';
  const password = 'password';
  const token = '123';

  before(() => {
    userDouble.sanitize = stub().returns(userDouble);
  });

  describe('when login in with email and password', () => {
    describe('and the database operation is successful', () => {
      describe('and the user is authenticated', () => {

        const userService = new UserService();
        const tokenProvider = new TokenProvider();
        const auditService = new AuditService();
        const crmService = new CRMService();
        const service = new LoginService(userService, tokenProvider, crmService, auditService);

        before(() => {
          userDouble.validatePassword = stub().returns(true);
          stub(userService, 'getByEmail').returns(Promise.resolve(userDouble));
          stub(tokenProvider, 'sign').returns(Promise.resolve("123"));
          stub(auditService, 'userLoggedIn').returns(null);
        });

        it('returns a token', () => {
          service.login(email, password).then((result) => { expect(result).to.equal(token); });
        });
      });

      describe('and the user is not found by email', () => {
        const userService = new UserService();
        const tokenProvider = new TokenProvider();
        const crmService = new CRMService();
        const auditService = new AuditService();
        const service = new LoginService(userService, tokenProvider, crmService, auditService);

        before(() => {
          stub(userService, 'getByEmail').returns(Promise.resolve(null));
        });

        it('raises an Authentication Error', () =>
          expect(service.login(email, password)).to.be.rejectedWith(AuthenticationError));
      });

      describe('and the password is wrong', () => {

        const userService = new UserService();
        const tokenProvider = new TokenProvider();
        const crmService = new CRMService();
        const auditService = new AuditService();
        const service = new LoginService(userService, tokenProvider, crmService, auditService);

        before(() => {
          stub(userService, 'getByEmail').returns(Promise.resolve(userDouble));
          stub(auditService, 'userLoggedIn').returns(null);
          userDouble.validatePassword = stub().returns(false);
        });

        it('raises an Authentication Error', () => {
          expect(service.login(email, password)).to.be.rejectedWith(AuthenticationError);
        });
      });
    });
  });
});

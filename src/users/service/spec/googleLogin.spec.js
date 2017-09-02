import { stub } from 'sinon';
import GoogleProvider from 'security/authentication/googleProvider';
import TokenProvider from 'security/authentication/TokenProvider';
import LoginService from '../LoginService';
import UserService from 'users/service/UserService';
import AuditService from 'audit/service/AuditService';
import CRMService from 'users/service/CRMService';

describe('Login service', () => {
  describe('when logging in through Google', () => {
    const code = 'xyz123';
    const token = '123';

    const profileInfo = {
      email: 'someone@somewhere.net',
      firstName: 'Test',
      lastName: 'Test'
    };

    const googleProvider = {
      getProfile: stub().returns(Promise.resolve(profileInfo))
    };

    const user = { sanitize: () => { } };

    before(() => {
      stub(GoogleProvider, 'build').returns(googleProvider);
    });

    after(() => {
      GoogleProvider.build.restore();
    });

    describe('when the user does not already exist', () => {
      const userService = new UserService();
      const tokenProvider = new TokenProvider();
      const auditService = new AuditService();
      const crmService = new CRMService();
      const service = new LoginService(userService, tokenProvider, crmService, auditService);
      let result;

      before(async () => {
        stub(tokenProvider, 'sign').returns(Promise.resolve(token));
        stub(userService, 'getByEmail').returns(Promise.resolve(null));
        stub(userService, 'signup').returns(Promise.resolve(user));
        stub(crmService, 'syncUserWithCRM').returns(null);
        result = await service.googleLogin(code);
      });

      it('signs up a new user with the Google profile information', () => {
        expect(userService.signup).to.be.calledWith(profileInfo);
      });

      it('returns a token', () => {
        expect(result).to.equal(token);
      });
    });

    describe('when user already exists', () => {
      const userService = new UserService();
      const tokenProvider = new TokenProvider();
      const crmService = new CRMService();
      const service = new LoginService(userService, tokenProvider, crmService);
      let result;

      before(async () => {
        stub(tokenProvider, 'sign').returns(Promise.resolve(token));
        stub(userService, 'getByEmail').returns(Promise.resolve(user));
        result = await service.googleLogin(code);
      });

      it('returns a token', () => {
        expect(result).to.equal(token);
      });
    });
  });
});

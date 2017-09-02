import { stub } from 'sinon';
import FacebookProvider from 'security/authentication/facebookProvider';
import TokenProvider from 'security/authentication/TokenProvider';
import LoginService from '../LoginService';
import UserService from 'users/service/UserService';
import AuditService from 'audit/service/AuditService';
import CRMService from 'users/service/CRMService';

describe('Login service', () => {
  describe('when logging in through Facebook', () => {
    const code = 'xyz123';
    const token = '123';
    const user = { sanitize: () => { } };

    const profileInfo = {
      email: 'someone@somewhere.net',
      firstName: 'Test',
      lastName: 'Test'
    };

    const facebookProvider = {
      getProfile: stub().returns(Promise.resolve(profileInfo))
    };

    before(() => {
      stub(FacebookProvider, 'build').returns(facebookProvider);
    });

    after(() => {
      FacebookProvider.build.restore();
    });

    describe('when the user does not already exist', () => {
      const tokenProvier = new TokenProvider();
      const userService = new UserService();
      const auditService = new AuditService();
      const crmService = new CRMService();
      const service = new LoginService(userService, tokenProvier, crmService, auditService);
      let result;

      before(async () => {
        stub(tokenProvier, 'sign').returns(Promise.resolve(token));
        stub(userService, 'getByEmail').returns(Promise.resolve(null));
        stub(userService, 'signup').returns(Promise.resolve(user));
        stub(crmService, 'syncUserWithCRM').returns(null);
        result = await service.facebookLogin(code);
      });

      it('signs up a new user with the Facebook profile information', () => {
        expect(userService.signup).to.be.calledWith(profileInfo);
      });

      it('returns a token', () => {
        expect(result).to.equal(token);
      });
    });

    describe('when user already exists', () => {
      const tokenProvier = new TokenProvider();
      const userService = new UserService();
      const crmService = new CRMService();
      const service = new LoginService(userService, tokenProvier, crmService);
      let result;

      before(async () => {
        stub(userService, 'getByEmail').returns(Promise.resolve(user));
        stub(tokenProvier, 'sign').returns(Promise.resolve(token));
        result = await service.facebookLogin(code);
      });

      it('returns a token', () => {
        expect(result).to.equal(token);
      });
    });
  });
});

//@flow
import AuthenticationError from '../exceptions/AuthenticationError';
import type TokenProvider from 'security/authentication/TokenProvider';
import GoogleProvider from 'security/authentication/googleProvider';
import FacebookProvider from 'security/authentication/facebookProvider';
import type UserService from 'users/service/UserService';
import type OAuthProvider from 'security/authentication/interfaces/OAuthProvider';
import CRMService from './CRMService';

export default class LoginService {
  userService: UserService;
  tokenProvider: TokenProvider;
  crmService: CRMService;

  constructor(userService: UserService, tokenProvider: TokenProvider, crmService: CRMService) {
    this.userService = userService;
    this.tokenProvider = tokenProvider;
    this.crmService = crmService;
  }

  async login(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (user && user.validatePassword(password)) {
      return this.tokenProvider.sign(user.sanitize());
    } else {
      throw new AuthenticationError();
    }
  }

  async googleLogin(code: string) {
    return await this._loginOrSignupWithProvider(GoogleProvider.build(), code);
  }

  async facebookLogin(code: string) {
    return await this._loginOrSignupWithProvider(FacebookProvider.build(), code);
  }

  async _loginOrSignupWithProvider(provider: OAuthProvider, code: string) {
    const { firstName, lastName, email } = await provider.getProfile(code);
    let user = await this.userService.getByEmail(email);
    if (!user) {
      user = await this.userService.signup({ firstName, lastName, email });
      this.crmService.syncUserWithCRM(user);
    }
    return await this.tokenProvider.sign(user.sanitize());
  }
}

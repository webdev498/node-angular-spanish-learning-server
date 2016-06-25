import { logError, logInfo } from './../../logging';
import AuthenticationError from './../exceptions/AuthenticationError';
import * as UserService from './../../users/service';
import * as TokenProvider from './../../authentication/tokenProvider';
import GoogleProvider from './../../authentication/googleProvider';
import FacebookProvider from './../../authentication/facebookProvider';

export const login = (email, password) => {
  logInfo(`Logging in with email ${email}.`);

  return new Promise((resolve, reject) => {
    UserService.getByEmail(email).then((user) => {
      if (user && user.validatePassword(password)) {
        TokenProvider.sign(user.sanitize()).then((token) => {
          resolve(token);
        });
      } else {
        reject(new AuthenticationError());
      }
    },
      (error) => {
        logError(error);
        reject(error);
      });
  });
};

export const googleLogin = (code) => {
  return loginOrSignupWithProvider(GoogleProvider.build(), code);
};

export const facebookLogin = (code) => {
  return loginOrSignupWithProvider(FacebookProvider.build(), code);
};

function loginOrSignupWithProvider(provider, code) {
  return new Promise(async (resolve, reject) => {
    try {
      const { firstName, lastName, email } = await provider.getProfile(code);
      let user = await UserService.getByEmail(email);

      if (!user) {
        user = await UserService.signup({ firstName, lastName, email });
      }

      const token = await TokenProvider.sign(user.sanitize());
      resolve(token);
    } catch (error) {
      logError(error);
      reject(error);
    }
  });
}
import { logError, logInfo } from './../../logging';
import AuthenticationError from './../exceptions/AuthenticationError';
import * as UserService from './../../users/service';
import * as TokenProvider from './../../authentication/tokenProvider';

export const login = (email, password) => {
  logInfo(`Logging in with email ${email}.`)
  return new Promise((resolve, reject) => {
    UserService.getByEmail(email).then(user => {
      if (user && user.validatePassword(password)) {
        TokenProvider.sign(user.sanitize()).then(token => {
          resolve(token);
        });
      } else {
        reject(new AuthenticationError());
      }
    },
      error => {
        logError(error);
        reject(error);
      });
  });
};

export const oAuthLogin = (strategy, profile) => {
  logInfo(`Attempting to login with ${strategy}.`)
  return new Promise((resolve, reject) => {
    let userInfo = extractProfileInfo(strategy, profile);
    UserService.getByEmail(userInfo.email).then(user => {
      if (user) {
        TokenProvider.sign(user.sanitize()).then(token => {
          resolve(token);
        });
      } else {
        UserService.signup(userInfo).then(user => {
          TokenProvider.sign(user.sanitize()).then(token => {
            resolve(token);
          });
        }, error => {
          logError(error);
          reject(error);
        });
      }
    },
      error => {
        logError(error);
        reject(error);
      });
  });
}

const extractProfileInfo = (strategy, profile) => {
  var userInfo = {};

  switch (strategy) {
    case 'facebook':
      userInfo.firstName = profile.name.first;
      userInfo.lastName = profile.name.last;
      userInfo.email = profile.email;
      break;
    case 'google':
      userInfo.firstName = profile.name.givenName;
      userInfo.lastName = profile.name.familyName;
      userInfo.email = profile.emails[0].value;
      break;
  }

  return userInfo;
}


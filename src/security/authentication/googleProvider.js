import googleapi from 'googleapis';
import { logError } from './../../logging';
import { GoogleOptions } from './oauthConfig';
import type OAuthProvider from './interfaces/OAuthProvider';

const {clientId, clientSecret, redirectUri} = GoogleOptions;

export default class GoogleProvider implements OAuthProvider{
  constructor(client) {
    this.client = client;
  }

  getProfile(code) {
    return new Promise((resolve, reject) => {
      this.client.getToken(code, (err, tokens) => {
        if (err) {
          logError(err);
          reject(err);
        } else {
          this.client.setCredentials(tokens);
          googleapi.oauth2('v2').userinfo.v2.me.get({ auth: this.client }, (err, {email, given_name, family_name}) => {
            if(err) {
              logError(err);
              reject(err);
            }
            resolve({email, firstName: given_name, lastName: family_name});
          });
        }
      });
    });
  }

  static build(clientImpl) {
    if (!clientImpl) {
      clientImpl = new googleapi.auth.OAuth2(clientId, clientSecret, redirectUri);
    }
    return new GoogleProvider(clientImpl);
  }
}

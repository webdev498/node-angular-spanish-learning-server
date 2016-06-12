import facebookapi from 'fb';
import { logError } from './../logging';
import { FacebookOptions } from './oauthConfig';

const {clientId, clientSecret, redirectUri} = FacebookOptions;

const accessOptions = {
  client_id: clientId,
  client_secret: clientSecret,
  redirect_uri: `${redirectUri}/`
};

class FacebookProvider {
  constructor(client) {
    this.client = client;
  }
  getProfile(code) {
    return new Promise((resolve, reject) => {
      accessOptions.code = code;
      this.client.napi('oauth/access_token', accessOptions, (accessError, { access_token }) => {
        if(accessError) {
          logError(accessError);
          reject(accessError);
        } else {
          const meOptions = {
            fields: ['first_name', 'last_name', 'email'],
            access_token
          };

          this.client.napi('me', meOptions, (meError, {email, first_name, last_name}) => {
            if(meError) {
              logError(meError);
              reject(meError);
            }
            resolve({email, firstName: first_name, lastName: last_name});
          });
        }
      });
    });
  }
  static build(clientImpl) {
    if(!clientImpl) {
      clientImpl = facebookapi;
    }
    return new FacebookProvider(clientImpl);
  }
}

export default FacebookProvider;
 const { FACEBOOK_APP_ID, FACEBOOK_SECRET, GOOGLE_APP_ID, GOOGLE_SECRET, OAUTH_PASSWORD } = process.env;
 
 export const FacebookOptions = {
  provider: 'facebook',
  password: OAUTH_PASSWORD,
  clientId: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_SECRET,
  isSecure: false,
};
    
export const GoogleOptions = {
  provider: 'google',
  password: OAUTH_PASSWORD,
  clientId: GOOGLE_APP_ID,
  clientSecret: GOOGLE_SECRET,
  isSecure: false
};
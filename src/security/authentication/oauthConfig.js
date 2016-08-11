 const { FACEBOOK_APP_ID, FACEBOOK_SECRET, GOOGLE_APP_ID, GOOGLE_SECRET, REDIRECT_URI } = process.env;

 export const FacebookOptions = {
  clientId: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_SECRET,
  redirectUri: REDIRECT_URI
};

export const GoogleOptions = {
  clientId: GOOGLE_APP_ID,
  clientSecret: GOOGLE_SECRET,
  redirectUri: REDIRECT_URI
};

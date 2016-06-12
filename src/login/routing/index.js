import { login, googleAuthLogin, facebookAuthLogin } from './../controllers/';

export default (server) => {
  server.route({
    method: 'POST',
    path: '/login',
    config: {
      auth: false,
      handler: login
    }
  });

  server.route({
    method: 'POST',
    path: '/login/facebook',
    config: {
      auth: false,
      handler: facebookAuthLogin
    }
  });

  server.route({
    method: 'POST',
    path: '/login/google',
    config: {
      auth: false,
      handler: googleAuthLogin
    }
  });
};

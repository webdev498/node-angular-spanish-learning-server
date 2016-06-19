import { login, googleAuthLogin, facebookAuthLogin } from './../controllers/';

export default (server) => {
  server.route({
    method: 'POST',
    path: '/login',
    handler: login,
    config: {
      auth: false
    }
  });

  server.route({
    method: 'POST',
    path: '/login/facebook',
    handler: facebookAuthLogin,
    config: {
      auth: false
    }
  });

  server.route({
    method: 'POST',
    path: '/login/google',
    handler: googleAuthLogin,
    config: {
      auth: false
    }
  });
};

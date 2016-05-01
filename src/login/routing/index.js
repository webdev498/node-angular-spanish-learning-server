import { login, oAuthLogin } from './../controllers/';

export default server => {
  server.route({
    method: 'POST',
    path: '/login',
    handler: login
  });

  server.route({
    method: 'GET',
    path: '/login/facebook',
    config: {
      auth: 'facebook',
      handler: oAuthLogin
    }
  });

  server.route({
    method: 'GET',
    path: '/login/google',
    config: {
      auth: 'google',
      handler: oAuthLogin
    }
  });
}
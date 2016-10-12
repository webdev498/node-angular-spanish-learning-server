//@flow
import Router from 'cgihttp/Router';
import LoginController from './controllers/LoginController';
import LoginService from './service/LoginService';
import TelephonesController from './controllers/TelephonesController';
import TelephonesService from './service/TelephoneService';
import UsersController from './controllers/UsersController';
import UserService from './service/UserService';
import TokenProvider from 'security/authentication/TokenProvider';
import UnauthorizedError from 'exceptions/requests/Unauthorized';
import { logError, logInfo } from 'logging';
import HapiJwtAuth2 from 'hapi-auth-jwt2';
import type { Server, Request } from 'cgihttp/index';

const { TOKEN_EXPIRATION, SECRET } = process.env;

const tokenOptions = {
  algorithm: 'HS256',
  expiresIn: TOKEN_EXPIRATION || '365d',
  issuer: 'urn:cgi:authentication',
  subject: 'urn:cgi:user'
};

export async function authorizeRequest(request: Request, reply: Function) {
  let permission;
  const service = new UserService();
  const { credentials } = request.auth;

  if (request.route.settings.plugins['AuthorizationMiddleware']) {
    permission = request.route.settings.plugins['AuthorizationMiddleware'].permission;
  }

  if (credentials && permission) {
    const user = await service.get(credentials);

    if (await user.hasPermission(permission)) {
      logInfo(`${user.get('email')} was successfully authorized for ${permission}`);
        reply.continue();
    } else {
      logInfo(`${user.get('email')} was not authorized for ${permission}`);
      reply(new UnauthorizedError(request));
    }
  } else {
    logInfo(`${request.route.method} ${request.path} is either unauthenticated or does not require permissions`);
    reply.continue();
  }
}

export const register = (server: Server, options: Object, next: Function) => {
  const userService = new UserService();
  const telephonesController = new TelephonesController(new TelephonesService(userService));
  const tokenProvider = new TokenProvider(tokenOptions, SECRET);
  const usersController = new UsersController(userService, tokenProvider);
  const loginController = new LoginController(new LoginService(userService, tokenProvider));
  const router = new Router(server);

  server.register(HapiJwtAuth2, (err) => {
    if (err) { logError(err); }
    server.auth.strategy('jwt', 'jwt', {
      key: SECRET,
      validateFunc: async (principle: Object, request: Request, callback: Function) => {
        const user = await userService.get(principle);
        callback(null, (user && user.get('active')));
      },
      verifyOptions: {
        algorithms: ['HS256']
      }
    });
    server.auth.default('jwt');
  });

  server.ext('onPostAuth', authorizeRequest);

  router
    .post()
    .to('/users')
    .authorize('urn:cgi:permission:users::create')
    .bind(usersController, 'create');

  router
    .get()
    .to('/users')
    .authorize('urn:cgi:permission:users::list')
    .bind(usersController, 'list');

  router
    .get()
    .to('/users/{id}')
    .authorize('urn:cgi:permission:users::view')
    .bind(usersController, 'get');

  router
    .put()
    .to('/users/{id}')
    .authorize('urn:cgi:permission:users::update')
    .bind(usersController, 'update');

  router
    .put()
    .to('/users/{userId}/telephones/{telephoneId}')
    .authorize('urn:cgi:permission:telephones::update')
    .bind(telephonesController, 'update');

  router
    .post()
    .to('/login')
    .bind(loginController, 'login');

  router
    .post()
    .to('/login/facebook')
    .bind(loginController, 'facebookAuthLogin');

  router
    .post()
    .to('/login/google')
    .bind(loginController, 'googleAuthLogin');


  router.register(next);
};

register.attributes = {
  name: 'Users resource service',
  version: '0.0.1'
};

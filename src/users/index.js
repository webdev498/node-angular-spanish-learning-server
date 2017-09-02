//@flow
import Router from 'http/Router';
import LoginController from './controllers/LoginController';
import LoginService from './service/LoginService';
import TelephonesController from './controllers/TelephonesController';
import TelephonesService from './service/TelephoneService';
import AddressesController from './controllers/AddressesController';
import AddressService from './service/AddressService';
import UsersController from './controllers/UsersController';
import ExaminationResultsController from 'examinations/controllers/ExaminationResultsController';
import UserService from './service/UserService';
import AuditService from 'auditing/service/AuditService';
import CRMService from './service/CRMService';
import ExaminationResultService from 'examinations/services/ExaminationResultService';
import TokenProvider from 'security/authentication/TokenProvider';
import UnauthorizedError from 'exceptions/requests/Unauthorized';
import { logError, logInfo } from 'logging';
import type { Server, Request } from 'http/index';


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
  const auditService = new AuditService();
  const crmService = new CRMService();
  const telephonesController = new TelephonesController(new TelephonesService(userService));
  const addressesController = new AddressesController(new AddressService(userService));
  const tokenProvider = new TokenProvider(tokenOptions, SECRET);
  const usersController = new UsersController(userService, tokenProvider, crmService);
  const loginController = new LoginController(new LoginService(userService, tokenProvider, crmService, auditService));
  const resultsController = new ExaminationResultsController(new ExaminationResultService());
  const router = new Router({server, resource: ''});

  server.register(require('hapi-auth-jwt2'), (err) => {
    if (err) { logError(err); }
    server.auth.strategy('jwt', 'jwt', {
      key: SECRET,
      verifyFunc(principle: Object, request: Request, callback: Function) {
        userService.get(principle).then((user) => {
          callback(null, (user && user.get('active')), user);
        }, (error) => {
          callback(error, false);
        });
      },
      verifyOptions: {
        algorithms: ['HS256']
      }
    });
    server.auth.default('jwt');
  });

  server.ext('onPostAuth', authorizeRequest);

  router
    .post('/users')
    .bind(usersController, 'create');

  router
    .get('/users')
    .authorize('urn:cgi:permission:users::list')
    .bind(usersController, 'list');

  router
    .get('/users/{id}')
    .authorize('urn:cgi:permission:users::view')
    .bind(usersController, 'get');

  router
    .put('/users/{id}')
    .authorize('urn:cgi:permission:users::update')
    .bind(usersController, 'update');

  router
    .post('/users/{userId}/addresses')
    .authorize('urn:cgi:permission:addresses::create')
    .bind(addressesController, 'add');

  router
    .put('/users/{userId}/telephones/{telephoneId}')
    .authorize('urn:cgi:permission:telephones::update')
    .bind(telephonesController, 'update');

  router
    .post('/users/{userId}/telephones')
    .authorize('urn:cgi:permission:telephones::create')
    .bind(telephonesController, 'create');


  router
    .post('/login')
    .bind(loginController, 'login');

  router
    .post('/login/facebook')
    .bind(loginController, 'facebookAuthLogin');

  router
    .post('/login/google')
    .bind(loginController, 'googleAuthLogin');

  router
    .get('/users/{id}/examination-results/latest')
    .authorize('urn:cgi:permission:examination results::view')
    .bind(resultsController, 'latestForUser');

  router
    .get('/users/{id}/examination-results/all')
    .authorize('urn:cgi:permission:premieruserhistory::view')
    .bind(resultsController, 'allForUser');

  router
    .post('/users/resetpassword')
    .bind(usersController, 'resetPassword');

  router
    .post('/users/{id}/resetpassword')
    .bind(usersController, 'updatePassword');

  router.register(next);
};

register.attributes = {
  name: 'Users resource service',
  version: '0.0.1'
};

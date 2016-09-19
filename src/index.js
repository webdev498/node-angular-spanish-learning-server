import 'babel-polyfill';
import Server from './Server';
import * as globalExceptionHandler from 'exceptions/globalHandler';
import * as logging from './logging';
import * as LanguageService from './languages';
import * as TerminologyService from './terminology';
import * as CategoriesService from './categories';
import * as UserService from './users';
import * as NationalityService from './nationalities';
import * as LoginService from './login';
import * as TokenProvider from './security/authentication/tokenProvider';
import HapiJwtAuth2 from 'hapi-auth-jwt2';
import * as authMiddleware from 'authorization/middleware';

const server = new Server({
  connections: {
    routes: {
      cors: {
        origin: ['*'],
        headers: [
          'Accept',
          'Authorization',
          'Content-Type',
          'If-None-Match',
          'X-Auth-Token'
        ]
      }
    }
  }
});


const noop = (error) => { if (error) { logging.logError(error); }};

server.connection({ port: process.env.PORT || 3000 });

server.register(globalExceptionHandler, noop);
server.register(logging, noop);
server.register(HapiJwtAuth2, (err) => {
  if (err) { logging.logError(err); }
  server.auth.strategy('jwt', 'jwt', TokenProvider.jwtAuthOptions);
  server.auth.default('jwt');
});
server.register(authMiddleware, noop);
server.register(CategoriesService, noop);
server.register(LanguageService, noop);
server.register(TerminologyService, noop);
server.register(UserService, noop);
server.register(NationalityService, noop);
server.register(LoginService, noop);

server.start(noop);

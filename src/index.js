import 'babel-polyfill';
import Server from './Server';
import * as logging from './logging';
import * as ChoiceService from './choices';
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

const port = process.env.PORT || 3000;

const noop = () => { };
server.connection({ port });

server.register(logging, noop);
server.register(HapiJwtAuth2, (err) => {
  if (err) { logging.logError(err); }
  server.auth.strategy('jwt', 'jwt', TokenProvider.jwtAuthOptions);
  server.auth.default('jwt');
});
server.register(authMiddleware, noop);

server.register(CategoriesService, noop);
server.register(ChoiceService, noop);
server.register(UserService, noop);
server.register(NationalityService, noop);
server.register(LoginService, noop);

server.start(noop);

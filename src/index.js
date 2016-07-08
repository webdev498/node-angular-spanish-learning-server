import 'babel-polyfill';
import Server from './Server';
import * as logging from './logging';
import * as ChoiceService from './choices';
import * as CategoriesService from './categories';
import * as UserService from './users';
import * as NationalityService from './nationalities';
import * as LoginService from './login';
import * as TokenProvider from './authentication/tokenProvider';
import HapiJwtAuth2 from 'hapi-auth-jwt2';

const server = new Server({
  connections: {
    routes: {
      cors: {
        origin: ['*'],
        headers: ['*'],
        credentials: true
      }
    }
  }
});

const port = process.env.PORT || 3000;

const noop = () => { };
server.connection({ port });
server.register({ register: logging }, noop);

server.register(HapiJwtAuth2, (err) => {
  if (err) { logging.logError(err); }
  server.auth.strategy('jwt', 'jwt', TokenProvider.jwtAuthOptions);
  server.auth.default('jwt');
});

server.register({ register: CategoriesService }, noop);
server.register({ register: ChoiceService }, noop);
server.register({ register: UserService }, noop);
server.register({ register: NationalityService }, noop);
server.register({ register: LoginService }, noop);

server.start(noop);

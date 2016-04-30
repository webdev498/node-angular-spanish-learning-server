import 'babel-polyfill';
import Server from './Server';
import * as logging from './logging';
import * as ChoiceService from './choices';
import * as CategoriesService from './categories';
import * as UserService from './users';
import * as NationalityService from './nationalities';
import * as LoginService from './login';
import * as OAuthProvider from './authentication/oAuthConfig';
import Bell from 'bell';

const server = new Server({
  connections: {
    routes: { cors: true }
  }
});

const port = process.env.PORT || 3000;

const noop = () => {};
server.connection({ port });
server.register({register: logging}, noop);
//TODO: Figure out how to move this out of here
server.register(Bell, (err) => {
  if(err) { logging.logError(err); }
  server.auth.strategy('facebook', 'bell', OAuthProvider.FacebookOptions);
  server.auth.strategy('google', 'bell', OAuthProvider.GoogleOptions);
});
server.register({register: CategoriesService}, noop);
server.register({register: ChoiceService}, noop);
server.register({register: UserService}, noop);
server.register({register: NationalityService}, noop);
server.register({register: LoginService}, noop);

server.start(noop);

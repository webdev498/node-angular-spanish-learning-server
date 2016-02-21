import 'babel/polyfill';
import Server from './Server';
import * as logging from './logging';
import * as ChoiceService from './choices';
import * as UserService from './users';

const server = new Server({
  connections: {
    routes: { cors: true }
  }
});

const port = process.env.PORT || 3000;

const noop = () => {};

server.connection({ port });

logging.decorate(server);
ChoiceService.register(server);
UserService.register(server);

server.start(noop);

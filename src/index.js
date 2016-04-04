import 'babel/polyfill';
import Server from './Server';
import * as logging from './logging';
import * as ChoiceService from './choices';
import * as CategoriesService from './categories';
import * as UserService from './users';

const server = new Server({
  connections: {
    routes: { cors: true }
  }
});

const port = process.env.PORT || 3000;

const noop = () => {};
server.connection({ port });

server.register({ register: logging }, noop);
server.register({register: CategoriesService}, noop);
server.register({register: ChoiceService}, noop);
server.register({register: UserService}, noop);


server.start(noop);

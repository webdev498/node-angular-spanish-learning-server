//@flow

import 'babel-polyfill';
import Server from './Server';
import * as globalExceptionHandler from 'exceptions/globalHandler';
import * as logging from './logging';
import * as LanguageService from './languages';
import * as TerminologyService from './terminology';
import * as CategoriesService from './categories';
import * as UserService from './users';
import * as NationalityService from './nationalities';

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

server.register(logging, noop);
server.register(globalExceptionHandler, noop);
server.register(UserService, noop);
server.register(CategoriesService, noop);
server.register(LanguageService, noop);
server.register(TerminologyService, noop);
server.register(NationalityService, noop);

server.start(noop);

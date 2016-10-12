/* @flow */
import { GET, PUT, PATCH, POST, DELETE, HEAD, OPTIONS } from 'cgihttp/methods';
import Server from '../Server';

export class Route {
  method: string;
  path: string;
  handler: Function;
  config: Object;
  isAuthenticated: boolean;

  constructor(method: string) {
    this.method = method;
    this.config = { auth: false };
  }

  to(path: string): Route {
    this.path = path;
    return this;
  }

  authorize(permission: string): Route {
    delete this.config.auth;
    Object.assign(this.config, {
      plugins: {
        AuthorizationMiddleware: {
          permission
        }
      }
    });
    return this;
  }

  bind(controller: Object, methodName: string ): Route {
    this.handler = controller[methodName].bind(controller);
    return this;
  }

  toJSON() {
    const { method, path, handler, config } = this;
    return {
      method,
      path,
      handler,
      config
    };
  }
}

const addRoute = (method: string, router: Router) => {
  const route = new Route(method);
  router.routes.push(route);
  return route;
};

export default class Router {
  server: Server;
  routes: Array<Route>;

  constructor(server: Server) {
    this.server = server;
    this.routes = [];
  }

  register(callback: Function) {
    this.routes.map(this.route, this);
    callback();
  }

  get(): Route {
    return addRoute(GET, this);
  }

  put(): Route {
    return addRoute(PUT, this);
  }

  patch(): Route {
    return addRoute(PATCH, this);
  }

  post(): Route {
    return addRoute(POST, this);
  }

  delete(): Route {
    return addRoute(DELETE, this);
  }

  head(): Route {
    return addRoute(HEAD, this);
  }

  options(): Route {
   return addRoute(OPTIONS, this);
  }

  route(route: Route) {
    this.server.route(route.toJSON());
  }
}

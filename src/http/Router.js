/* @flow */
import { join } from 'path';
import { GET, PUT, PATCH, POST, DELETE, HEAD, OPTIONS } from 'http/methods';
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

const addRoute = (method: string, path: string, router: Router) => {
  const route = new Route(method);
  route.to(join('/', router.resource, path));
  router.routes.push(route);
  return route;
};

type RouterConfiguration = {
  server: Server;
  resource: string;
};

export default class Router {
  server: Server;
  routes: Array<Route>;
  resource: string;

  constructor(config: RouterConfiguration) {
    Object.assign(this, config);
    this.routes = [];
  }

  register(callback: Function) {
    this.routes.map(this.route, this);
    callback();
  }

  get(path: string): Route {
    return addRoute(GET, path, this);
  }

  put(path: string): Route {
    return addRoute(PUT, path, this);
  }

  patch(path: string): Route {
    return addRoute(PATCH, path, this);
  }

  post(path: string): Route {
    return addRoute(POST, path, this);
  }

  delete(path: string): Route {
    return addRoute(DELETE, path, this);
  }

  head(path: string): Route {
    return addRoute(HEAD, path, this);
  }

  options(path: string): Route {
   return addRoute(OPTIONS, path, this);
  }

  route(route: Route) {
    this.server.route(route.toJSON());
  }
}

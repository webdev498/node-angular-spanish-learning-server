import * as UsersService from 'users/service';
import UnauthorizedError from 'exceptions/requests/Unauthorized';
import { logInfo } from 'logging';

export const name = 'AuthorizationMiddleware';
const version = '0.0.1';

export async function authorizeRequest(request, reply) {

  /* eslint-disable no-console */
  let permission;
  const { credentials } = request.auth;

  if (request.route.settings.plugins[name]) {
    permission = request.route.settings.plugins[name].permission;
  }

  if (credentials && permission) {
    const user = await UsersService.get(credentials);

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


export const register = (server, options, next) => {
  server.ext('onPostAuth', authorizeRequest);
  next();
};

register.attributes = {
  name,
  version
};

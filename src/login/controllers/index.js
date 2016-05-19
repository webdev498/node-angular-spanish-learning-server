import * as LoginService from './../service';
import * as ServiceErrorFactory from './../../exceptions/Factory';
import { UNAUTHORIZED } from './../../http/statusCodes';

export const login = (request, reply) => {
  const { email, password } = request.payload;

  return LoginService.login(email, password)
    .then((token) => {
      return reply({ token });
    },
    () => {
      reply({ authenticated: false }).statusCode = UNAUTHORIZED;
    });
};

export const oAuthLogin = (request, reply) => {
  if (request.auth.isAuthenticated) {
    const strategy = request.auth.strategy;
    const profile = request.auth.credentials.profile;

    LoginService.oAuthLogin(strategy, profile)
      .then((token) => {
        return reply({ token });
      },
      (error) => {
        let serviceError = ServiceErrorFactory.create(request, error);
        reply(serviceError).statusCode = serviceError.statusCode;
      });
  } else {
    reply({ authenticated: false }).statusCode = UNAUTHORIZED;
  }
};

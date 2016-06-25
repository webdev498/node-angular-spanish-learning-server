import * as LoginService from './../service';
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

export const googleAuthLogin = async (request, reply) => {
  const { code } = request.payload;
  try {
    const token = await LoginService.googleLogin(code);
    return reply({ token });
  } catch (error) {
    reply({ authenticated: false }).statusCode = UNAUTHORIZED;
  }
};

export const facebookAuthLogin = async (request, reply) => {
  const { code } = request.payload;
  try {
    const token = await LoginService.facebookLogin(code);
    return reply({ token });
  } catch (error) {
    reply({ authenticated: false }).statusCode = UNAUTHORIZED;
  }
};

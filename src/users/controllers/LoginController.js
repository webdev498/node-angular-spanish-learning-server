//@flow
import type LoginService from '../service/LoginService';
import type { Request } from 'http/index';
import { UNAUTHORIZED } from 'http/status-codes';


export default class LoginController {
  service: LoginService;

  constructor(service: LoginService) {
    this.service = service;
  }

  async login(request: Request, reply: Function) {
    const { email, password } = request.payload;
    try {
      const token = await this.service.login(email, password);
      reply({token});
    } catch (error) {
      reply({ authenticated: false }).statusCode = UNAUTHORIZED;
    }
  }

  async googleAuthLogin(request: Request, reply: Function) {
    const { code } = request.payload;
    try {
      const token = await this.service.googleLogin(code);
      return reply({ token });
    } catch (error) {
      reply({ authenticated: false }).statusCode = UNAUTHORIZED;
    }
  }

  async facebookAuthLogin(request: Request, reply: Function) {
    const { code } = request.payload;
    try {
      const token = await this.service.facebookLogin(code);
      return reply({ token });
    } catch (error) {
      reply({ authenticated: false }).statusCode = UNAUTHORIZED;
    }
  }

}

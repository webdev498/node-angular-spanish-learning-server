//@flow
import { CREATED } from 'http/statusCodes';
import * as EmailMessage from 'email';
import type { Request } from 'http/index';
import type TokenProvider from 'security/authentication/TokenProvider';
import type UserService from '../service/UserService';

export default class UsersController {
  service: UserService
  tokenProvider: TokenProvider

  constructor(service: UserService, tokenProvider: TokenProvider) {
    this.service = service;
    this.tokenProvider = tokenProvider;
  }

  async create(request: Request, reply: Function) {
    try {
      const user = await this.service.signup(request.payload);
      const token = await this.tokenProvider.sign(user.sanitize());
      await EmailMessage.signupConfirmation(user);
      return reply({ token }).statusCode = CREATED;
    } catch (error) {
      reply(error);
    }
  }

  async list(request: Request, reply: Function) {
    try {
      reply(await this.service.all());
    } catch (error) {
      reply(error);
    }
  }

  async get(request: Request, reply: Function) {
    try {
      reply(await this.service.get(request.params));
    } catch (error) {
      reply(error);
    }
  }

  async update(request: Request, reply: Function) {
    try {
      reply(await this.service.update(request));
    } catch (error) {
      reply(error);
    }
  }
}
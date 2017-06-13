//@flow
import { CREATED, NOT_FOUND, NO_CONTENT } from 'http/status-codes';
import * as EmailMessage from 'email';
import CRMService from './../service/CRMService';
import type { Request } from 'http/index';
import type TokenProvider from 'security/authentication/TokenProvider';
import type UserService from '../service/UserService';

export default class UsersController {
  service: UserService
  tokenProvider: TokenProvider
  crmService: CRMService

  constructor(service: UserService, tokenProvider: TokenProvider, crmService: CRMService) {
    this.service = service;
    this.tokenProvider = tokenProvider;
    this.crmService = crmService;
  }

  async create(request: Request, reply: Function) {
    try {
      const user = await this.service.signup(request.payload);
      const token = await this.tokenProvider.sign(user.sanitize());
      await EmailMessage.signupConfirmation(user);
      this.crmService.syncUserWithCRM(user);
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

  async resetPassword(request: Request, reply: Function) {
    try {
      const userInfo = await this.service.resetPassword(request.payload);
      if (userInfo === null) 
        return reply().statusCode = NOT_FOUND;

      await EmailMessage.resetPassword(userInfo.user);
      return reply().statusCode = NO_CONTENT;
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

  async updatePassword(request: Request, reply: Function) {
    try {
      await this.service.updatePasswordFromReset(request);
      return reply().statusCode = NO_CONTENT;
    } catch (error) {
      reply(error);
    }
  }
}

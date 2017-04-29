//@flow
import AddressService from '../service/AddressService';
import { CREATED } from 'http/status-codes';
import type { Request } from 'http/index';

export default class AddressesController {
  service: AddressService

  constructor(service: AddressService) {
    this.service = service;
  }

  async add(request: Request, reply: Function) {
    try {
      const address = await this.service.add(request);
      reply(address).statusCode = CREATED;
    } catch (error) {
      reply(error);
    }
  }
}

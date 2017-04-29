//@flow
import type UserService from './UserService';
import Address from '../models/Address';
import MissingRecordError from 'exceptions/runtime/MissingRecordError';
import { Request } from 'http/index';

export default class AddressService {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async add({ params, payload }: Request) {
    const { userId } = params;
    const { street, city, state, postalCode, type } = payload;

    const user = await this.userService.get({id: userId});

    if (user) {
      return Address.forge({
        userId: user.get('id'),
        street,
        city,
        state,
        postalCode,
        type
      }).save();
    } else {
      throw new MissingRecordError(`Could not add an address for user ${userId}`);
    }
  }
}

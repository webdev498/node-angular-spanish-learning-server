//@flow
import type UserService from './UserService';
import MissingRecordError from 'exceptions/runtime/MissingRecordError';
import { Request } from 'http/index';

export default class TelephonesService {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  async update({ params, payload }: Request) {
    const { userId, telephoneId } = params;
    const user = await this.userService.get({id: userId});
    const telephone = await user.related('telephones').get(telephoneId);
    if (telephone) {
      return await telephone.save(payload, {patch: true});
    } else {
      throw new MissingRecordError(`Could not find telephone with ${telephoneId} for user ${userId}`);
    }
  }
}

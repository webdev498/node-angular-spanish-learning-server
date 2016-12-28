//@flow
import Subscription from 'subscriptions/models/Subscription';
import type User from 'users/models/User';

export default class SubscriptionService {
  static async create(user: User, level: string) {
    const subscription = new Subscription({
      userId: user.get('id'),
      level
    });
    return await subscription.save();
  }
// static async cancel(user: User)
// static async renew(user: User)
// static async upgrade(user: User, level: String)
}

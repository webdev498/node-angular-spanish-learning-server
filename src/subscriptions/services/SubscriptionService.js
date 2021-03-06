//@flow
import type User from 'users/models/User';
import Subscription from 'subscriptions/models/Subscription';

const windows = {
  'study': 1,
  'exam': 2
};

function convertDateToUTC(date: Date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds());
}

function extendDate(date: Date, noMonths: number) {
  date.setMonth(date.getUTCMonth() + noMonths);
  return date;
}

function calculateExpiryForSubscription(level: string) {
  return convertDateToUTC(extendDate(new Date(), windows[level]));
}

export default class SubscriptionService {
  async create(user: User, level: string, billingAgreement: Object) {
    const expirationDate = calculateExpiryForSubscription(level);
    const subscription = new Subscription({
      userId: user.get('id'),
      level,
      expirationDate,
      billingAgreement
    });
    return await subscription.save();
  }

  async createPayflowProfile(userId: string, level: string, payflowProfileId: string) {
    const expirationDate = null;
    const billingAgreement = null;
    const subscription = new Subscription({
      userId: userId,
      level,
      expirationDate,
      billingAgreement,
      payflowProfileId
    });
    return await subscription.save();
  }

async cancel(user: User, subscription: Subscription) {
  if (subscription) {
    await subscription.cancel();
  }
  return subscription;
}

async renew(user: User) {
  const subscription = Subscription.where({userId: user.get('id')}).fetch();
  const expirationDate = calculateExpiryForSubscription(subscription.get('level'));
  await subscription.save({expirationDate}, {patch: true});
  return subscription;
}

  static async upgrade(user: User, level: string) {
    const subscription = Subscription.where({userId: user.get('id')}).fetch();
    const expirationDate = calculateExpiryForSubscription(level);
    await subscription.save({expirationDate}, {patch: true});
    return subscription;
  }
}

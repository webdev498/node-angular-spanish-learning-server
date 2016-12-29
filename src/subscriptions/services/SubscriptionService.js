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
  static async create(user: User, level: string, billingAggreement: Object) {
    const expirationDate = calculateExpiryForSubscription(level);
    const subscription = new Subscription({
      userId: user.get('id'),
      level,
      expirationDate,
      billingAggreement
    });
    return await subscription.save();
  }

static async cancel(user: User) {
  const subscription = Subscription.where({userId: user.get('id')}).fetch();
  if (subscription) {
    await subscription.cancel();
  }
  return subscription();
}

static async renew(user: User) {
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

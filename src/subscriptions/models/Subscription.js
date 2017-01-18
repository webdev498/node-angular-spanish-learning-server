import Orm from 'data/orm';
import Base from 'models/Base';
import User from 'users/models/User';

const subscriptionLevels = [
  'general',
  'study',
  'examination'
  ];

const tableName = 'subscriptions';
const persistenceWhitelist = ['level', 'expiration_date', 'user_id', 'billing_agreement'];

const Subscription = Base.extend({
  tableName,

  initialize(attributes) {
    Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
  },

  user() {
    return this.belongsTo(User);
  },

  serialize() {
    return {
      ...this.attributes
    };
  },

  async cancel() {
    await this.destroy();
    this.set('expirationDate', null);
  },

  validate() {
    if(subscriptionLevels.contains(this.attributes.level)) {
      throw new TypeError(`Subscription level must be one of ${subscriptionLevels.join(',')}`);
    }
  }
});

export default Orm.model('Subscription', Subscription);

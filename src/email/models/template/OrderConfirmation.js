 //@flow
 import Message from '../Message';
 import type User from './../../users/models/User';

  export default class OrderConfirmation extends Message {
    constructor(recipient: User) {
      super(recipient);
      this.subject = 'Your Order has been processed with CertifiedSpanish.com';
    }

    get body() {
      return `Thank you for your order ${this.recipient.get('firstName')}`;
    }
  }
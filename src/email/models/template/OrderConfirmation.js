 import Message from '../Message';

  export default class OrderConfirmation extends Message {
    constructor(recipient) {
      super(recipient);
      this.subject = 'Your Order has been processed with CertifiedSpanish.com';
    }

    get body() {
      return `Thank you for your order ${this.recipient.get('firstName')}`;
    }
  }
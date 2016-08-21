 import Message from '../Message';

  export default class Welcome extends Message {
    constructor(recipient) {
      super(recipient);
      this.subject = 'Welcome to CertifiedSpanish.com';
    }

    get body() {
      return `Welcome ${this.recipient.firstName}, <p>Thank you for registering.  You can now have full access to the exam portion of CertifiedSpanish.com</p>`;
    }
  }
 import Message from '../Message';
 import type User from './../../users/models/User';

  export default class Welcome extends Message {
    constructor(recipient: User) {
      super(recipient);
      this.subject = 'Welcome to CertifiedSpanish.com';
    }

    get body() {
      return `Welcome ${this.recipient.get('firstName')}, <p>Thank you for registering.  You can now have full access to the exam portion of CertifiedSpanish.com</p>`;
    }
  }
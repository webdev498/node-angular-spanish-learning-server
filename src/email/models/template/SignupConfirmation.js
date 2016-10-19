 //@flow
 import Message from '../Message';
 import type User from './../../users/models/User';

  export default class SignupConfirmation extends Message {
    constructor(recipient: User) {
      super(recipient);
      this.subject = 'Please Confirm Your Email Address with CertifiedSpanish.com';
    }

    get body() {
      let callbackurl = process.env.CONFIRMATION_CALLBACK_URL + '?user=' + this.recipient.id;
      return `Thank you for registering ${this.recipient.get('firstName')}, <p>Please complete the registration process by clicking this link:</p><a href="${callbackurl}">${callbackurl}</a>`;
    }
  }
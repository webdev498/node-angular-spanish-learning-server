 import Message from '../Message';

  export default class ResetPassword extends Message {
    constructor(recipient) {
      super(recipient);
      this.subject = 'Please follow the link to continue the password reset process';
      this.to = this.recipient.get('email');
      this.newPassword = this.recipient.get('password');
    }

    get body() {
      const resetUrl = process.env.RESET_PASSWORD_CALLBACK_URL + '?user=' + this.recipient.id;
      let emailBody = `<p>Please complete the reset password process by clicking this link:</p><a href="${resetUrl}">${resetUrl}</a>`;
      emailBody += `<p>For your reference your password has been reset to: ${this.newPassword}</p>`;
      return emailBody;
    }
  }
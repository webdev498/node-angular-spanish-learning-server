import type User from './../users/models/User';

export default class Message {
    constructor(recipient: User) {
      this.from = process.env.DEFAULT_FROM_ADDRESS;
      this.recipient = recipient;
      this.to = recipient.get('email');
    }
  }
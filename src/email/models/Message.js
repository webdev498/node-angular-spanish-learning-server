//@flow
import type User from './../users/models/User';

export default class Message {
  from: string;
  recipient: User;
    
    constructor(recipient: User) {
      this.from = process.env.DEFAULT_FROM_ADDRESS;
      this.recipient = recipient;
    }
  }
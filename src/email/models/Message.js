export default class Message {
    constructor(recipient) {
      this.from = process.env.DEFAULT_FROM_ADDRESS;
      this.recipient = recipient;
      this.to = null;
      this.cc = null;
    }
  }
import RuntimeError from './../../exceptions/runtime';


const DEFAULT_MESSSAGE = 'The provided password does not match the password for this user.';

export default class UserPasswordMismatchError extends RuntimeError {
  constructor(message = DEFAULT_MESSSAGE) {
    super(arguments);
    this.message = message;
  }
}

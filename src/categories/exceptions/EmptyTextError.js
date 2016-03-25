import RuntimeError from './../../exceptions/runtime';


const DEFAULT_MESSSAGE = "text must be a string with a length greater than zero";

export default class EmptyTextError extends RuntimeError {
  constructor(message = DEFAULT_MESSSAGE) {
    super(arguments);
    this.message = message;
  }
}

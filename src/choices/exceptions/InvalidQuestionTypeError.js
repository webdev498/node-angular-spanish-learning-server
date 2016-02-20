import RuntimeError from './../../exceptions/runtime';

export default class InvalidQuestionTypeError extends RuntimeError {
  constructor(message = 'This is not a valid type of question.') {
    super(arguments);
    this.message = message;
  }
}

 import Message from '../Message';

  export default class QuestionFeedback extends Message {
    constructor(fromUser, feedbackText, question) {
      super(null);
      this.subject = 'Feedback submitted from a question during an exam';
      this.feedbackText = feedbackText;
      this.question = question;
      this.fromUser = fromUser;
      this.to = 'admin@commongroundinternational.com';
    }

    get body() {
      let formattedQuestion = JSON.stringify(this.question,undefined,2); //pretty format the object
      return `From ${this.fromUser.get('firstName')} ${this.fromUser.get('lastNameName')}: <p>${this.feedbackText}</p>Question:<p>${formattedQuestion}</p>`;
    }
  }
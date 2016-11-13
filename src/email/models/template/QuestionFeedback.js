 import Message from '../Message';

  export default class QuestionFeedback extends Message {
    constructor(fromUser, feedbackText, question) {
      super(null);
      this.subject = 'Feedback submitted from a question during an exam';
      this.feedbackText = feedbackText;
      this.question = question;
      this.fromUser = fromUser;
      this.to = 'consulting@surfdew.com';
      //this.cc = fromUser.get('email');
      //this.to = 'admin@commongroundinternational.com';
    }

    get body() {
      let formattedQuestion = JSON.stringify(this.question,undefined,2); //pretty format the object
      let part1 = `From ${this.fromUser.get('firstName')} ${this.fromUser.get('lastName')}: <p>${this.feedbackText}</p>Question:<p>${this.question.type} : ${this.question.question.text}</p>`;
      let part2 = `${part1}<p>Choices:</p>`;

      switch (this.question.type) {
        case 'Multiple Choice':
          for (let i = 0; i < this.question.choices.length; i++) {
              part2 += `${this.question.choices[i].text}<br>`
          }
          break;
      }

      return part2;
  }
}
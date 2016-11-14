 import Message from '../Message';

  export default class QuestionFeedback extends Message {
    constructor(fromUser, feedbackText, question) {
      super(null);
      this.subject = 'Feedback submitted from a question during an exam';
      this.feedbackText = feedbackText;
      this.question = question;
      this.fromUser = fromUser;
      this.cc = fromUser.get('email');
      this.to = 'admin@commongroundinternational.com';
    }

    get body() {
      let formattedQuestion = JSON.stringify(this.question,undefined,2); //pretty format the object
      let intro = `From ${this.fromUser.get('firstName')} ${this.fromUser.get('lastName')}: <p>${this.feedbackText}</p>Question:<p>${this.question.type} : ${this.question.question.text}</p>`;
      let termBody = `${intro}<p>Terms:</p>`;

      switch (this.question.type) {
        case 'Multiple Choice':
          for (let i = 0; i < this.question.choices.length; i++) {
              termBody += `${this.question.choices[i].text}<br>`
          }
          break;
        case 'Category Matching':
          for (let i = 0; i < this.question.categories.length; i++) {
              termBody += `${this.question.categories[i].text}<br>`
          }

          termBody += '<p></p>';

          for (let i = 0; i < this.question.choices.length; i++) {
              termBody += `${this.question.choices[i].text}<br>`
          }
          break;
        case 'Term Matching':
          for (let i = 0; i < this.question.terms.length; i++) {
              termBody += `${this.question.terms[i].text}<br>`
          }
          break;
      }

      return termBody += `<p>${fomattedQuestion}</p>`;
  }
}
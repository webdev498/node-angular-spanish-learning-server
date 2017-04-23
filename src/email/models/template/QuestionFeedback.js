 import Message from '../Message';

  export default class QuestionFeedback extends Message {
    constructor(fromUser, feedback) {
      super(null);
      this.cgiAppType = feedback.examId === undefined ? 'study' : 'exam';
      this.subject = `Feedback submitted from a question during ${this.cgiAppType === 'study' ? `a study session` : `an exam`}`;
      this.feedbackText = feedback.text;
      this.question = feedback.question;
      this.term = feedback.term;
      this.fromUser = fromUser;
      this.cc = fromUser.get('email');
      this.to = 'admin@commongroundinternational.com';
    }

    get body() {
      const formattedQuestion = JSON.stringify((this.cgiAppType === 'study' ? this.term : this.question),undefined,2); //pretty format the object
      const userInfo = `From ${this.fromUser.get('firstName')} ${this.fromUser.get('lastName')}:`;
      const examIntro = `${userInfo} <p>${this.feedbackText}</p>Question:<p>${this.question.type} : ${this.question.question.text}</p>`;
      const studyIntro = `${userInfo} ${this.term.text}`;
      let termBody = '';

      if (this.cgiAppType === 'exam') {
            termBody = `${examIntro}<p>Terms:</p>`;

            switch (this.question.type) {
                case 'Multiple Choice':
                case 'Multiple Choice English':
                case 'Multiple Choice Spanish':
                for (let i = 0; i < this.question.choices.length; i++) {
                    termBody += `${this.question.choices[i].text}<br>`;
                }
                break;
                case 'Category Matching':
                for (let i = 0; i < this.question.categories.length; i++) {
                    termBody += `${this.question.categories[i].text}<br>`;
                }

                termBody += '<p></p>';

                for (let i = 0; i < this.question.choices.length; i++) {
                    termBody += `${this.question.choices[i].text}<br>`;
                }
                break;
                case 'Term Matching':
                for (let i = 0; i < this.question.terms.length; i++) {
                    termBody += `${this.question.terms[i].text}<br>`;
                }
                break;
            }
        }

        if (this.cgiAppType === 'study')
            termBody += studyIntro;

        return termBody += `<p style='margin-top: 25px'>${formattedQuestion}</p>`;
      }
}
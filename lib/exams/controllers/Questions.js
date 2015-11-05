import QuestionDataService from '../data/questions/service';

export default class QuestionsController {

  constructor({ datastore, logger }) {
    this.dataProvider = new QuestionDataService(datastore, logger);
    this.name = this.constructor.name;
  }

  // Fetches and returns data for a specific question
  show (request, response) {
    this.dataProvider.fetch(request.params).then(
      (question) => {
        response.status(200).json(question);
      },
      (error) => {
        response.status(error.status).json(error);
      }
    );
  }

  // Displays all of the available questions
  list(request, response) {
    this.dataProvider.all().then(
      (questions) => response.status(200).json(questions),
      (error) => response.status(error.status).json(error)
    ).catch((error) => response.status(error.status || 500).json(error));
  }

  // Adds a question to the bank of quetions
  create(request, response) {
    this.dataProvider.create(request.body).then(
      (question) => {
        response.status(201).json(question);
      },
      (error) => {
        response.status(error.status).json(error);
      }
    ).catch((error) => response.status(error.status || 500).json(error));
  }

  // Removes a question from the bank of available questions
  update (request, response) {
    let {params, body} = request;
    this.dataProvider.update(params, body).then(
      () => {
        response.status(204).send();
      },
      (error) => {
        response.status(error.status).json(error);
      }
    );
  }

  // Deletes a question from the available pool of questions.
  // This does not dissociate it from any exams that it was
  // previously assigned to
  remove (request, response) {
    this.dataProvider.remove(request.params).then(
      () => response.status(204).send(),
      (error) => response.status(error.status).json(error)
    );
  }

}

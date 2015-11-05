import ExamDataService from '../data/examinations/service';

export default class ExaminationsController {

  constructor(application) {
    this.dataService = new ExamDataService(application);
  }

  show (request, response) {
    this.dataService.fetch(request.params).then(
      (exam) => response.json(exam),
      (error) => response.status(error.status).json(error)
    );
  }

  create(request, response) {
    this.dataService.create(request.body).then(
      (exam) => response.status(201).json(exam),
      (error) => response.status(error.status).json(error)
    );
  }

  grade (request, response){
    this.dataService.evaluate(request).then(
      (result) => response.status(200).json(result),
      (error) => response.status(error.status).json(error)
    );
  }

}

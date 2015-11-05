import Question from '../../models/Question';
import { inspect } from 'util';
import PersistenceException from '../../../exceptions/PersistanceException.js';
import ValidationException from '../../../exceptions/ValidationException';
import AuthorizationException from '../../../exceptions/AuthorizationException';

const TABLE_NAME = 'Questions';

export default class QuestionDataService {
  constructor(datastore, logger) {
    this.provider = datastore ;
    this.logger = logger;
  }

  // Fetch all questions in the Questions table
  all() {
    this.logger.info('Fetching all questions from the database');
    return this.provider.all(TABLE_NAME).then(
      (results) => results.map((result) => new Question(result))
    );
  }

  // Fetch a specific question
  fetch({ id }) {
    this.logger.info(`Fetching question from the database with id: ${id}`);
    return this.provider.find(TABLE_NAME, { id }).then(
      (result) => {
        this.logger.info(`successfully fetched question ${ result }`);
        return new Question(result);
      },
      (error) => {
        this.logger.error(error);
        return new PersistenceException(error);
      }
    );
  }

  // Create a new Question
  create(object) {
    const self = this;
    this.logger.debug(`Question Data Service: Attempting to create a new question ${inspect(object)}`);
    return new Promise((resolve, reject) => {
      const question = new Question(object);
      if(question.isValid()){
        self.logger.debug('Question Data Service: Question is valid, attempting to insert into database');
        self.provider.insert(TABLE_NAME, question).then(
          (result) => {
            self.logger.debug(`Question Data Service: Successfully created Question: ${inspect(result)}`);
            resolve(new Question(result));
          },
          (error) => {
            let exception = new PersistenceException(error);
            self.logger.error(exception);
            reject(error);
          }
        ).catch((exception) => {
          self.logger.error(exception);
          reject(exception);
        });
      } else {
        let error = new ValidationException(`Question is not valid with properties: ${inspect(object)}`);
        self.logger.error(error);
        reject(error);
      }
    });
  }

  update({ id }, object) {
    this.logger.debug(`Question Data Service: Attempting to update question with params: ${id} and data: ${inspect(object)}`);
    return new Promise((resolve, reject) => {
      if (id === object.id) {
        let question = new Question(object);
        if(question.isValid()){
          this.provider.update(TABLE_NAME, id, question).then(
            (result) => resolve(new Question(result)),
            (error) => reject(new PersistenceException(error))
          );
        } else {
          let error = new ValidationException('The question is not valid');
          this.logger.error(error);
          reject(error);
        }
      } else {
        let error = new AuthorizationException();
        this.logger.error(error);
        reject(error);
      }
    });
  }

  remove({ id }) {
    return this.provider.remove(TABLE_NAME, id);
  }

}

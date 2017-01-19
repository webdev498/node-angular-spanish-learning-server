import type UserPrinciple from 'users/model/User';
import ExaminationResult from 'examinations/models/ExaminationResult';
import MissingRecordError from 'exceptions/runtime/MissingRecordError';

export default class ExaminationResultService {
  async getAllResultsForUser(user: UserPrinciple): ExaminationResult {
    const examResults = await ExaminationResult.query(query => {
      query.where({user_id: user.get('id')});
      query.orderBy('created_at', 'DESC');
    }).fetchAll();

    if (examResults) {
      return examResults;
    } else {
      throw new MissingRecordError(`There are no examination results for user with id: ${user.get('id')}`);
    }
  }

  async getLastResultForUser(user: UserPrinciple): ExaminationResult {
    const examResult = await ExaminationResult.query(query => {
      query.where({user_id: user.get('id')});
      query.orderBy('created_at', 'DESC');
    }).fetch();

    if (examResult) {
      return examResult;
    } else {
      throw new MissingRecordError(`There are no examination results for user with id: ${user.get('id')}`);
    }
  }
}
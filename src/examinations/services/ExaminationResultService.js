//@flow
import type UserPrinciple from 'users/models/User';
import ExaminationResult from 'examinations/models/ExaminationResult';
import MissingRecordError from 'exceptions/runtime/MissingRecordError';

export default class ExaminationResultService {
  async getAllResultsForUser(user: UserPrinciple): ExaminationResult {
    const examResults = await ExaminationResult.query(query => {
      query.where({user_id: user.get('id')});
      query.orderBy('created_at', 'DESC');
    }).fetchAll({ withRelated: ['categoryResults'] });

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
    }).fetch({ withRelated: ['categoryResults']});

    if (examResult) {
      return examResult;
    } else {
      throw new MissingRecordError(`There are no examination results for user with id: ${user.get('id')}`);
    }
  }
}
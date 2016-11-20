import type UserPrinciple from 'users/model/User';
import ExaminationResult from 'examinations/models/ExaminationResult';

export default class ExaminationResultService {
  async getResultsForUser(user: UserPrinciple): ExaminationResult {
    return await ExaminationResult.query(query => {
      query.where({user_id: user.get('id')});
      query.orderBy('created_at', 'DESC');
    }).fetch();
  }
}
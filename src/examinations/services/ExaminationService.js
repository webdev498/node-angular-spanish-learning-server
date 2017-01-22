//@flow
import Examination from 'examinations/models/Examination';
import type { ExamSubmission } from 'examinations/models/Examination';
import ExaminationResult from 'examinations/models/ExaminationResult';
import type UserPrinciple from 'users/models/User';
import type UserService from 'users/service/UserService';
import buildExam from '../jobs/exam-builder';
import gradeExam from '../jobs/exam-grader';
import MissingRecordError from 'exceptions/runtime/MissingRecordError';
import * as EmailMessage from 'email';


export default class ExaminationService {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async create({ payload }: Object) {
    if (!['short', 'normal', 'long', 'micro'].includes(payload.type)) {
      throw new TypeError(`${payload.type} is not a valid Exam type. Must be 'short', 'normal', or 'long'`);
    }

    const exam = await buildExam(payload);
    return await exam.save();
  }

  async feedback(principle: UserPrinciple, payload: Object) {
    const userId = principle.id;
    const user = await this.userService.get({id: userId});
    return await EmailMessage.questionFeedback(user, payload.text, payload.question);
  }

  async submit(id: string, principle: UserPrinciple, submission: ExamSubmission) {
    const exam = await Examination.where({ id }).fetch();
    
    if (!exam) {
      throw new MissingRecordError(`Unable to find Exam with id: ${id}`);
    }

    const sections = gradeExam(exam, submission);

    const counts = sections.reduce((counts, section) => {
      counts.pointsPossible += section.possible;
      counts.pointsAwarded += section.correct;
      counts.itemCount += section.items;
      return counts;
    }, {pointsPossible: 0, pointsAwarded: 0, itemCount: 0});

    const { pointsPossible, pointsAwarded, itemCount } = counts;

    const examResult = await ExaminationResult.forge({
      userId: principle.id,
      examId: exam.id,
      itemCount,
      pointsAwarded,
      pointsPossible,
      sections
     }).save();

    await exam.destroy();
    return examResult;
  }
}

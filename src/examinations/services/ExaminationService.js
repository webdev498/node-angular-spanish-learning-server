import buildExam from '../jobs/exam-builder';

export default class ExaminationService {
  async create() {
    const exam = await buildExam();
    return await exam.save();
  }
}

//@flow
import type Examination, { ExamSubmission} from 'examinations/models/Examination';
import gradingStrategies from '../strategies/grading';


export default (exam: Examination, submission: ExamSubmission) => {
  const examSections = exam.get('sections');

  const sections = examSections.map((section) => {
    const strategy = gradingStrategies[section.type];
    const submissionResponses = submission.responses.filter(({ sectionId }) => sectionId === section.id );

    const testCases = section.questions.map(question => {
      const submissionResponse = submissionResponses.find(({ questionId }) => questionId === question.id);
      const resp = submissionResponse ? submissionResponse.responses : [];
      return { question, responses: resp };
    });

    return strategy(section.id, testCases);
  });

  return sections;
};

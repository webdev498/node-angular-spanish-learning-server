//@flow
import Exam from 'examinations/models/Exam';
import strategies from '../strategies';
import { sections } from '../templates/exam-template';

export default async () => {
  const exam = Exam.forge({content: {sections: []}});

  const promises = sections.map((template) => {
    const strategy = strategies[template.type];
    return strategy(template);
  });

  const examSections = await Promise.all(promises);
  exam.addSections(examSections);

  return exam;
};

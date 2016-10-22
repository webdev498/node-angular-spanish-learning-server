//@flow
import Exam from 'examinations/models/Examination';
import buildStrategies from '../strategies/building';
import { sections } from '../templates/exam-template';

export default async () => {
  const exam = Exam.forge({content: {sections: []}});

  const promises = sections.map((template) => {
    const strategy = buildStrategies[template.type];
    return strategy(template);
  });

  const examSections = await Promise.all(promises);
  exam.addSections(examSections);

  return exam;
};

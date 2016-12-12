//@flow
import Exam from 'examinations/models/Examination';
import buildStrategies from '../strategies/building';
import { sections } from '../templates/exam-template';
import TerminologyService from '/terminology/TerminologyService';

export default async ({ type }: Object) => {
  const exam = Exam.forge({content: {sections: []}});

  const promises = sections.map((template) => {
    const strategy = buildStrategies[template.type];
    let terminologyService = new TerminologyService();
    return strategy(template, type, terminologyService);
  });

  const examSections = await Promise.all(promises);
  exam.addSections(examSections);

  return exam;
};

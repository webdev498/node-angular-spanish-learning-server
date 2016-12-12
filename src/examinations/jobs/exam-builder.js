//@flow
import Exam from 'examinations/models/Examination';
import buildStrategies from '../strategies/building';
import CategoryService from './categories/service';
import { sections } from '../templates/exam-template';
import TerminologyService from '/terminology/TerminologyService';

export default async ({ type }: Object) => {
  const exam = Exam.forge({content: {sections: []}});
  //use 3 random categories, other than 'Other' each exam
  const termCategories = await CategoryService.random(3);

  const promises = sections.map((template) => {
    const strategy = buildStrategies[template.type];
    let terminologyService = new TerminologyService(termCategories);
    return strategy(template, type, terminologyService);
  });

  const examSections = await Promise.all(promises);
  exam.addSections(examSections);

  return exam;
};

//@flow
"use strict";

import Exam from 'examinations/models/Examination';
import CategoryService from 'categories/service/CategoryService';
import buildStrategies from '../../strategies/building/practice';
import ExaminationTemplate from 'examinations/templates/ExaminationTemplate';

async function loadCategories(categoryIds) {
  if (!categoryIds || !categoryIds.length) {
    return await CategoryService.random(5);
  }
  return await CategoryService.find('id', 'in', categoryIds);
}


export default async ({ categories, sections, length }: Object) => {
  const categoriesCoveredByExam = await loadCategories(categories);
  const constraints = [];
  const mode = 'practice';
  const template = new ExaminationTemplate(Number(length), categoriesCoveredByExam, constraints, mode);
  template.addSections(sections.map(type => ({type, weight: 1})));

  await Promise.all(template.sections.map(section => {
    const strategy = buildStrategies[section.type];
    return strategy(section);
  }));

  return Exam.fromTemplate(template);
};

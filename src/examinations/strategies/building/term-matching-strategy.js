//@flow
import Translation from 'terminology/models/Translation';
import type { ExamSectionTemplate } from 'examinations/templates/ExamSectionTemplate';
import TermMatchingQuestionTemplate from 'examinations/templates/questions/TermMatchingQuestionTemplate';

function buildQuestion(section: ExamSectionTemplate, grouping: Array<Translation>) {
  const question = new TermMatchingQuestionTemplate(section);

  grouping.forEach(({translation, category}) => {
    question.addTerm(translation);
    question.addCategory(category);
    question.addCandidateResponses(translation);
    question.addCorrectResponseForTerm(translation, category);
  });

  return question;
}

async function fetchTranslations(section: ExamSectionTemplate): Promise<Array<Translation>> {
  const constraints = section.exam.constraints.filter(constraint => constraint.type === 'Category');

  const groupings = await Promise.all(constraints.map(async (constraint) => {
    const { weight, category } = constraint;
    const limit = Math.floor(weight * (section.itemCount * 5));
    const translations = await Translation.randomByCategory(limit, category);
    return { category, translations: translations.models };
  }));

  return groupings.reduce((memo, grouping) => {
    grouping.translations.forEach((translation) => {
      memo.push({ category: grouping.category, translation });
    });
    return memo;
  }, []);
}


export default async (section: ExamSectionTemplate) => {
  let groupings = await fetchTranslations(section);
  // let groupings = await Translation.random(section.itemCount * 5);

  groupings = groupings.reduce((accumulator, term, index, array) => {
    let position = index + 1;
    if (position % 5 === 0) {
      accumulator.push(array.slice(position - 5, position));
    }
    return accumulator;
  }, []);

  groupings.forEach((grouping) => section.addQuestion(buildQuestion(section, grouping)));
  return section;
};

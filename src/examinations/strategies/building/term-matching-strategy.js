//@flow
import Translation from 'terminology/models/Translation';
import type { ExamSectionTemplate } from 'examinations/templates/ExamSectionTemplate';
import TermMatchingQuestionTemplate from 'examinations/templates/questions/TermMatchingQuestionTemplate';

function buildQuestion(section: ExamSectionTemplate, translations: Array<Translation>) {
  const question = new TermMatchingQuestionTemplate(section);

  translations.forEach(translation => {
  question.addTerm(translation);
  question.addCandidateResponses(translation);
  question.addCorrectResponseForTerm(translation);
  });

  return question;
}

async function fetchTranslations(section: ExamSectionTemplate): Promise<Array<Translation>> {
  const constraints = section.exam.constraints.filter(constraint => constraint.type === 'Category');

  const groupings = await Promise.all(constraints.map(async (constraint) => {
    const { weight, category } = constraint;
    const limit = Math.floor(weight * section.itemCount);
    const translations = await Translation.randomByCategory(limit, category);
    return { category, translations: translations.models };
  }));

  return groupings.reduce((memo, grouping) => {
    grouping.translations.forEach((translation) => {
      const { source, target } = translation.relations;
      memo.push({ category: grouping.category, source, target });
    });
    return memo;
  }, []);
}


export default async (section: ExamSectionTemplate) => {
  let translations = await fetchTranslations(section);
  translations = await Translation.random(section.itemCount * 5);

  translations = translations.reduce((accumulator, term, index, array) => {
    let position = index + 1;
    if (position % 5 === 0) {
      accumulator.push(array.slice(position - 5, position));
    }
    return accumulator;
  }, []);

  translations.forEach((translation) => section.addQuestion(buildQuestion(section, translation)));
  return section;
};

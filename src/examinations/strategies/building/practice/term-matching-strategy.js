//@flow
import Translation from 'terminology/models/Translation';
import type { ExamSectionTemplate } from 'examinations/templates/ExamSectionTemplate';
import TermMatchingQuestionTemplate from 'examinations/templates/questions/TermMatchingQuestionTemplate';

async function fetchTranslations(section: ExamSectionTemplate): Promise<Array<Translation>> {
  const categories = section.exam.categoriesCovered.pluck('id');

  return Translation.query((queryBuilder) => {
    queryBuilder
      .join('terms', 'translations.source', 'terms.id')
      .join('categories_terms', 'terms.id', 'categories_terms.term_id')
      .where('categories_terms.category_id', 'in', categories)
      .orderByRaw('random()')
      .limit(section.itemCount * 5);
  }).fetchAll({ withRelated: ['source', 'target.categories'] });
}

function groupTranslationForQuestion(translations, section) {
  let count = section.itemCount;
  const groups = [];
  while (count > 0) {
    groups.push(translations.take(5));
    count--;
  }
  return groups;
}

export default async (section: ExamSectionTemplate) => {
  const translations = await fetchTranslations(section);
  const groupings = groupTranslationForQuestion(translations, section);

  const questions = groupings.map(translations => {
    const question = new TermMatchingQuestionTemplate(section);
    translations.forEach(translation => {
      const category = translation.related('target').related('categories').first();
      question.addTerm(translation);
      question.addCategory(category);
      question.addCandidateResponses(translation);
      question.addCorrectResponseForTerm(translation, category);
    });
    return question;
  });

  section.addQuestions(questions);
  return section;
};

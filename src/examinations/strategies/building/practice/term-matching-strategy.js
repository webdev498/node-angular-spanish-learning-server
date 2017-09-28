//@flow
import Translation from 'terminology/models/Translation';
import type { ExamSectionTemplate } from 'examinations/templates/ExamSectionTemplate';
import TermMatchingQuestionTemplate from 'examinations/templates/questions/TermMatchingQuestionTemplate';
import { logWarning } from 'logging';

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
  const groups = [];

  let count = section.itemCount,
    index = 0;

  while (count > 0) {
    groups.push(translations.slice(index, index + 5));
    count--;
    index += 5;
  }

  return groups;
}

export default async (section: ExamSectionTemplate) => {
  const translations = await fetchTranslations(section);
  const translationGroupings = groupTranslationForQuestion(translations, section);

  const questions = translationGroupings.map(translationGroup => {
     // Diagnostic logging
    if (translationGroup.length < 5) { // Not enough to build a full question
      const questionInformation = translationGroup.map(translation => {
        const target = translation.related('target');
        return {
          source: translation.related('source').get('value'),
          target: target.get('value'),
          categories: target.related('categories').pluck('name')
        };
      });

      logWarning(`Insufficient number of terms to build term-matching question.
      Terms used for question: ${questionInformation}`);
    }

    return translationGroup.reduce((question, translation) => {
      const category = translation.related('target').related('categories').first();
      question.addTerm(translation);
      question.addCategory(category);
      question.addCandidateResponses(translation);
      question.addCorrectResponseForTerm(translation, category);
      return question;
    }, new TermMatchingQuestionTemplate(section));
  });

  section.addQuestions(questions);
  return section;
};

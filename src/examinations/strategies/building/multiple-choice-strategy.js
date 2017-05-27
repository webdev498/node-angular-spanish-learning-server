//@flow

import type MultipleChoiceSectionTemplate from 'examinations/templates/sections/MultipleChoiceSectionTemplate';
import Term from 'terminology/models/Term';
import TermExclusion from 'terminology/models/TermExclusion';
import Translation from 'terminology/models/Translation';
import MultipleChoiceQuestionTemplate from 'examinations/templates/questions/MultipleChoiceQuestionTemplate';
import { generatePseudoRandomNumberBetween } from 'javascript/libs/math';
import { noneOfTheAbove } from 'examinations/shared/none-of-the-above-response';


function getTranslations(section) {
  return section.categoryCounts.reduce((accumulator, {category, count}) => {
    if (count > 0) {
      accumulator.push(Translation.randomByCategory(count, category).then(translation => translation.models.map(model => ({ translation: model, category }))));
      return accumulator;
    } else {
      return accumulator;
    }
  }, []);
}

function addExclusionsToTranslations(translations, section) {
  return translations.map(({ translation, category }) => {
    const languageName = section.language;
    const foreignKey = languageName === 'Spanish' ? 'source' : 'target';
    return TermExclusion
      .where(`${foreignKey}_id`, '=', translation.get(foreignKey))
      .fetchAll()
      .then(exclusions => ({ translation, category, exclusions, languageName, foreignKey }));
  });
}

function addTermsForTranslation(translations, section) {
  return translations.map(async ({ translation, category, exclusions, languageName, foreignKey }, index) => {

    const limit = section.foilCount > 0 && index + 1 % section.foilCount === 0 ? 4 : 3;
    const termsToExclude = exclusions.pluck('targetId').concat(translation.get('target'), translation.get('source'));

    return Term.query(builder => {
      builder.join('languages', 'terms.language_id', 'languages.id');
      builder.join('categories_terms', 'terms.id', 'categories_terms.term_id');

      builder.where('terms.id', 'not in', termsToExclude);
      builder.where('languages.name', '=', languageName);
      builder.where('categories_terms.category_id', '=', category.get('id'));

      builder.orderByRaw('random()');
      builder.limit(limit);
      
    }).fetchAll()
    .then(terms => ({ translation, category, exclusions, languageName, terms, foreignKey }));
  });
}

function buildQuestionsFromTranslations(translations, section) {
  return translations.map(({ translation, category, languageName, terms, foreignKey }) => {
    const correctResponse = foreignKey === 'source' ? translation.relations['target'] : translation.relations['source'];
    const text = `What is the possible term for "${translation.relations[foreignKey].get('value')}" in ${languageName}`;
    const question = new MultipleChoiceQuestionTemplate(section, text);

    const candidates = terms.toArray();
    question.addCategory(category);

    if (candidates.length > 3) { // None of the Above is correct answer
      const foil = candidates.pop();
      const candidatePosition = generatePseudoRandomNumberBetween(0, candidates.length);
      candidates.splice(candidatePosition, 0, foil);
      question.addCorrectResponseForTerm(noneOfTheAbove);
    } else {
      const candidatePosition = generatePseudoRandomNumberBetween(0, candidates.length);
      candidates.splice(candidatePosition, 0, correctResponse);
      question.addCorrectResponseForTerm(correctResponse);
    }

    candidates.push(noneOfTheAbove);
    question.addTerms(candidates);

    return question;
  });
}

export default async function (section: MultipleChoiceSectionTemplate) {
  let translations = await Promise.all(getTranslations(section));
      translations = await Promise.all(addExclusionsToTranslations([].concat(...translations), section));
      translations = await Promise.all(addTermsForTranslation(translations, section));

  const questions = buildQuestionsFromTranslations(translations, section);
  section.addQuestions(questions);
  return section;
};
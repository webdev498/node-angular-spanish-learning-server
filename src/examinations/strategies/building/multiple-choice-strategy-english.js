//@flow
import type ExamSectionTemplate from 'examinations/templates/ExamSectionTemplate';
import Term from 'terminology/models/Term';
import TermExclusion from 'terminology/models/TermExclusion';
import Translation from 'terminology/models/Translation';
import MultipleChoiceQuestionTemplate from 'examinations/templates/questions/MultipleChoiceQuestionTemplate';
import { generatePseudoRandomNumberBetween } from 'javascript/libs/math';

const noneOfTheAbove = {
  id: '35fe100c-2e9b-42cf-bddc-a5ba3ad950ec',
  value: 'None of the above',
  get: (key) => noneOfTheAbove[key]
};

function buildQuestion({ target, source, section, candidates }) {
  const text = `What is the possible term for "${target.get('value')}" in English`;
  const question = new MultipleChoiceQuestionTemplate(section, text);
  question.addCorrectResponseForTerm(source);
  candidates.forEach(candidate =>  question.addTerm(candidate));
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
  const translations = await fetchTranslations(section);

  let questions = await Promise.all(translations.map(async ({ category, source, target }, index) => {
    const exclusions = await TermExclusion.where('source_id', '=', source.get('id')).fetchAll();
    const noneOfTheAboveCount = Math.floor(section.itemCount * 0.10);
    const limit = noneOfTheAboveCount > 0 && index + 1 % noneOfTheAboveCount === 0 ? 4 : 3;

    const terms = await Term.query(builder => {
      builder.where('id', 'not in', exclusions.pluck('targetId'));
      builder.join('languages', 'terms.language_id', 'languages.id');
      builder.join('categories_terms', 'terms.id', 'categories_terms.term_id');
      builder.where('languages.name', '=', 'English');
      builder.where('categories_terms.category_id', '=', category.get('id'));
      builder.orderByRaw('random()');
      builder.limit(limit);
    }).fetchAll();

    const candidates = terms.serialize().map(({id, value}) => ({id, value}));

    if (candidates.length > 3) { // None of the Above is correct answer
      const foil = candidates.pop();
      const candidatePosition = generatePseudoRandomNumberBetween(0, candidates.length);
      candidates.splice(candidatePosition, 0, foil);
      source = noneOfTheAbove;
    } else {
      const candidatePosition = generatePseudoRandomNumberBetween(0, candidates.length);
      candidates.splice(candidatePosition, 0,{id: source.get('id'), value: source.get('value')});
    }

    candidates.push(noneOfTheAbove);
    return buildQuestion({section, source, target, candidates });
  }));


  questions.forEach(question => section.addQuestion(question));
  return section;
};

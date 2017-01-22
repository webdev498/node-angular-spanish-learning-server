//@flow
import Term from 'terminology/models/Term';
import type { ExamSectionTemplate } from 'examinations/templates/ExamSectionTemplate';
import CategoryMatchingQuestionTemplate from 'examinations/templates/questions/CategoryMatchingQuestionTemplate';

const buildQuestion = (section: ExamSectionTemplate, terms: Array<Term>) => {
  const question = new CategoryMatchingQuestionTemplate(section);
  terms.forEach(term => {
    question.addTerm(term);
    question.addCorrectResponseForTerm(term);
    question.addCategoryForTerm(term);
  });
  return question;
};

export default async (section: ExamSectionTemplate) => {
  const categoryIds = section.exam.categoriesCovered.map(category => category.get('id'));

  let terms = await Term.query((qb) => {
    qb.join('categories_terms', 'terms.id', 'categories_terms.term_id');
    qb.join('categories', 'categories.id', 'categories_terms.category_id');
    qb.join('languages', 'terms.language_id', 'languages.id');
    qb.where('languages.name', '=', 'Spanish');
    qb.where('categories.id', 'in', categoryIds);
    qb.orderByRaw('random()');
    qb.limit(section.itemCount * 5);
  })
  .fetchAll({withRelated: ['categories']});

  terms = terms.reduce((accumulator, term, index, array) => {
    let position = index + 1;
    if (position % 5 === 0) {
      accumulator.push(array.slice(position - 5, position));
    }
    return accumulator;
  }, []);

  terms.forEach((group) => section.addQuestion(buildQuestion(section, group)));
  return section;
};

// @flow
import * as UUID from 'javascript/datatypes/uuid';
import type ExamSectionTemplate from 'examinations/templates/ExamSectionTemplate';
import Category from 'categories/models/Category';
import AbstractMethodError from 'exceptions/runtime/AbstractMethodError';
import type Term from 'terminology/models/Term';

export default class QuestionTemplate {
  id: string;
  type: string;
  text: ?string;
  section: ExamSectionTemplate;
  correctResponses: Array<Object>;
  categories: Array<Category>;
  terms: Array<Object>;

  constructor(section: ExamSectionTemplate, text: ?string) {
    this.id = UUID.v4();
    this.section = section;
    this.type = section.type;
    this.text = text;
    this.correctResponses = [];
    this.categories = [];
    this.terms = [];
  }

  setText(text: string) {
    this.text = text;
  }

  addTerm(term: Term) {
    this.terms.push({ id: term.get('id'), text: term.get('value') });
  }

  addTerms(terms: Array<Term>) {
    terms.forEach(term => this.addTerm(term));
  }

  addCategoriesForTerm(term: Term) {
    const { id, name } = term.relations.categories.first().attributes;
    this.categories.push({ id, text: name });
  }

  addCategory(category: Category) {
    const id = category.get('id');
    const name = category.get('name');

    this.categories.push({ id, text: name });
  }

  /*eslint-disable no-unused-vars*/
  addCorrectResponseForTerm(...args: Array<any>) {
    throw new AbstractMethodError();
  }

  toJSON(): Object {
    throw new AbstractMethodError();
  }

}

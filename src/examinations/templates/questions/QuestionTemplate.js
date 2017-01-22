// @flow
import * as UUID from 'javascript/datatypes/uuid';
import type ExamSectionTemplate from 'examinations/templates/ExamSectionTemplate';
import Category from 'categories/models/Category';
import AbstractMethodError from 'exceptions/runtime/AbstractMethodError';

export default class QuestionTemplate {
  id: string;
  type: string;
  text: string;
  section: ExamSectionTemplate;
  correctResponses: Array<Object>;
  categories: Array<Category>;
  terms: Array<Object>;

  constructor(section: ExamSectionTemplate, text: string) {
    this.id = UUID.v4();
    this.section = section;
    this.type = section.type;
    this.text = text;
    this.correctResponses = [];
    this.terms = [];
  }

  addTerm(term: { id: string; value: string }) {
    this.terms.push(term);
  }

  addCategoryForTerm() {
    throw new AbstractMethodError();
  }

  addCorrectResponseForTerm() {
    throw new AbstractMethodError();
  }

  toJSON(): Object {
    throw new AbstractMethodError();
  }

}

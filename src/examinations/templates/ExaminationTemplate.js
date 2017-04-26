// @flow

import ExamSectionTemplate from 'examinations/templates/ExamSectionTemplate';
import MultipleChoiceSectionTemplate from 'examinations/templates/sections/MultipleChoiceSectionTemplate';
import CategoryMatchingSectionTemplate from 'examinations/templates/sections/CategoryMatchingSectionTemplate';
import type { SectionParameters } from 'examinations/templates/ExamSectionTemplate';
import type Category from 'categories/models/Category';

const Sections = {
  'Multiple Choice English': MultipleChoiceSectionTemplate,
  'Multiple Choice Spanish': MultipleChoiceSectionTemplate,
  'Category Matching': CategoryMatchingSectionTemplate
};

const itemCounts = {
  micro: 8,
  short: 40,
  normal: 60,
  long: 100
};

export default class ExaminationTemplate {
  size: string;
  sections: Array<ExamSectionTemplate>;
  length: number;
  categoriesCovered: Array<BookshelfModel>;
  constraints: Array<Object>;

  get length(): number {
    return itemCounts[this.size] || itemCounts.normal;
  }

  constructor(size: string, categoriesToCover: Array<Category> = [], constraints: Array<Object> = []) {
    this.size = size;
    this.sections = [];
    this.categoriesCovered = categoriesToCover;
    this.constraints = constraints;
  }

  addSection(sectionParameters: SectionParameters): void {
    let section;
    const sectionParams = Object.assign(sectionParameters, { exam: this });
    const Section = Sections[sectionParameters.type];

    if (Section) {
      section = new Section(sectionParams);
    } else {
      section = new ExamSectionTemplate(sectionParams);
    }

    this.sections.push(section);
  }

  toJSON() {
    const { sections, length, categoriesCovered } = this;

    return {
      sections: sections.map(section => section.toJSON()),
      length,
      categoriesCovered: categoriesCovered.map(category => category.toJSON())
    };
  }
}

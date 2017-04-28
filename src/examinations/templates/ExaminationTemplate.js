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


export default class ExaminationTemplate {
  size: number;
  sections: Array<ExamSectionTemplate>;
  length: number;
  categoriesCovered: Array<BookshelfModel>;
  constraints: Array<Object>;
  mode: string;

  get length(): number {
    return this.size;
  }

  constructor(size: number, categoriesToCover: Array<Category> = [], constraints: Array<Object> = [], mode: string = 'qualification') {
    this.size = size;
    this.sections = [];
    this.categoriesCovered = categoriesToCover;
    this.constraints = constraints;
    this.mode = mode;
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

  addSections(sectionParameters: Array<SectionParameters>): void {
    sectionParameters.forEach(parameter => this.addSection(parameter));
  }

  toJSON() {
    const { sections, length, categoriesCovered, mode } = this;

    return {
      mode,
      sections: sections.map(section => section.toJSON()),
      length,
      categoriesCovered: categoriesCovered.map(category => category.toJSON())
    };
  }
}

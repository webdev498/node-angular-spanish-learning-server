// @flow

const itemCounts = {
  short: 30,
  normal: 50,
  long: 100
};

export type ExamSection = {
  id: string;
  type: string;
  instructions: string;
  itemCount: Function;
};

export const sections = [
  {
    id: "65a605e4-791b-4db2-85d8-507bfe6cea20",
    type: "Multiple Choice",
    instructions: "For the following questions choose the term the most correctly answers the question",
    itemCount: (type: string) => Math.floor(itemCounts[type] * .50)
  },
  {
    id: "ca4d8b1b-a554-4170-9ee2-99fe454d7061",
    type: "Term Matching",
    instructions: "Match each English and Spanish term together by dragging the term to the correct match",
    itemCount: (type: string) => Math.floor(itemCounts[type] * .25)
  },
  {
    id: "fe01927e-4f06-43ee-96f3-a9e52ab70e91",
    type: "Category Matching",
    instructions: "Group each term into a category by dragging the term from the top to category on the bottom",
    itemCount: (type: string) => Math.floor(itemCounts[type] * .25)
  }
];

// @flow
export type ExamSection = {
  id: string;
  type: string;
  instructions: string;
  itemCount: number;
};

export const sections = [
  {
    id: "65a605e4-791b-4db2-85d8-507bfe6cea20",
    type: "Multiple Choice",
    instructions: "For the following questions choose the term the most correctly answers the question",
    itemCount: 30
  },
  {
    id: "ca4d8b1b-a554-4170-9ee2-99fe454d7061",
    type: "Term Matching",
    instructions: "For the following questions, match the term on the with left with the correct term on the right",
    itemCount: 30
  },
  {
    id: "fe01927e-4f06-43ee-96f3-a9e52ab70e91",
    type: "Category Matching",
    instructions: "Group the terms on the left under the most appropriate category on the right",
    itemCount: 30
  }
];

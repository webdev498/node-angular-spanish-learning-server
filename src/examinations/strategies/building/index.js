import CategoryMatchingStrategy from './category-matching-strategy';
import TermMatchingStrategy from './term-matching-strategy';
import MultipleChoiceStrategy from './multiple-choice-strategy';

export default {
  'Multiple Choice English': MultipleChoiceStrategy,
  'Multiple Choice Spanish': MultipleChoiceStrategy,
  'Term Matching': TermMatchingStrategy,
  'Category Matching': CategoryMatchingStrategy
};

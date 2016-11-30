import CategoryMatchingStrategy from './category-matching-strategy';
import TermMatchingStrategy from './term-matching-strategy';
import MultipleChoiceStrategyEnglish from './multiple-choice-strategy-english';
import MultipleChoiceStrategySpanish from './multiple-choice-strategy-spanish';

export default {
  'Multiple Choice English': MultipleChoiceStrategyEnglish,
  'Multiple Choice Spanish': MultipleChoiceStrategySpanish,
  'Term Matching': TermMatchingStrategy,
  'Category Matching': CategoryMatchingStrategy
};

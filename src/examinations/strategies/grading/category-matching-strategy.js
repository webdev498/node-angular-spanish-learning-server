//@flow
export default (id: string, testCases: Array<Object>) => {

  let pointsPossibleInSection = 0;
  let pointsAwardedInSection = 0;

  const results = testCases.map(testCase => {
    const correct = testCase.responses.reduce((count, response) => {
      const correctResponse = testCase.question.correctResponses.find(correctResponse => correctResponse.categoryId === response.categoryId);
        if (correctResponse.termId === response.termId) {
          ++count;
        }
        return count;
      }, 0);

      const result = {
        questionId: testCase.question.id,
        possible: testCase.question.correctResponses.length,
        correct
      };

      pointsPossibleInSection += result.possible;
      pointsAwardedInSection += result.correct;

      return result;
  });

  return { id, items: results.length, possible: pointsPossibleInSection, correct: pointsAwardedInSection, results };
};

//@flow
export default (id: string, testCases: Array<Object>) => {

  let pointsPossibleInSection = 0;
  let pointsAwardedInSection = 0;

  const categoryResults = {};
  const results = testCases.map(testCase => {

    const correct = testCase.responses.reduce((count, response) => {
      const correctResponse = testCase.question.correctResponses.find(correctResponse => correctResponse.categoryId === response.categoryId);
      let correct = false;

      if (correctResponse.termId === response.termId) {
        count++;
        correct = true;
      }

      if (correctResponse.categoryId in categoryResults) {
        categoryResults[correctResponse.categoryId][correct ? 'correct' : 'incorrect']++;
      } else {
        categoryResults[correctResponse.categoryId] = {
          correct: +correct,
          incorrect: Math.abs(~(-1 * +correct)) // Flip the bit
        };
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

  return { id, items: results.length, categoryResults, possible: pointsPossibleInSection, correct: pointsAwardedInSection, results };
};

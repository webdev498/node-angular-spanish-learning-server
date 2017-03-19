//@flow
export default (id: string, testCases: Array<Object>) => {
  let pointsPossibleInSection = 0;
  let pointsAwardedInSection = 0;
  const categoryResults = {};

  const results = testCases.map(testCase => {
    const correct = testCase.responses.length > 0 && testCase.question.correctResponses[0].id === testCase.responses[0].termId;

    const result = {
      questionId: testCase.question.id,
      possible: testCase.question.correctResponses.length,
      correct: correct ? 1 : 0
    };

    pointsPossibleInSection += result.possible;
    pointsAwardedInSection += result.correct;

    testCase.question.categories.forEach((category) => {
      if (category.id in categoryResults) {
        categoryResults[category.id][result.correct ? 'correct' : 'incorrect']++;
      } else {
        categoryResults[category.id] = {
          correct: result.correct,
          incorrect: Math.abs(~(-1 * result.correct)) // Flip the bit
        };
      }
    });

    return result;
  });

  return { id, items: results.length, categoryResults, possible: pointsPossibleInSection, correct: pointsAwardedInSection, results };
};

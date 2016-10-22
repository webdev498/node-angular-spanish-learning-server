//@flow
export default (id: string, testCases: Array<Object>) => {
  let pointsPossibleInSection = 0;
  let pointsAwardedInSection = 0;

  const results = testCases.map(testCase => {
    const correct = testCase.responses.length > 0 && testCase.question.correctResponses[0].id === testCase.responses[0].termId;

    const result = {
      questionId: testCase.question.id,
      possible: testCase.question.correctResponses.length,
      correct: correct ? 1 : 0
    };

    pointsPossibleInSection += result.possible;
    pointsAwardedInSection += result.correct;

    return result;
  });

  return { id, items: results.length, possible: pointsPossibleInSection, correct: pointsAwardedInSection, results };
};

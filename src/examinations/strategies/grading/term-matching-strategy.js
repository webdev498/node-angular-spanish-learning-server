//@flow
export default (id: string, testCases: Array<Object>) => {
    let pointsPossibleInSection = 0;
    let pointsAwardedInSection = 0;
    const categoryResults = {};

    const results = testCases.map(testCase => {
      const correct = testCase.responses.reduce((count, response) => {
        const correctResponse = testCase.question.correctResponses.find(correctResponse => correctResponse.candidateId === response.candidateId);
        let isCorrect = false;

        if (correctResponse) {
          if (correctResponse.termId === response.termId) {
            ++count;
            isCorrect = true;
          }

          if (correctResponse.categoryId in categoryResults) {
            categoryResults[correctResponse.categoryId][isCorrect ? 'correct' : 'incorrect']++;
          } else {
            categoryResults[correctResponse.categoryId] = {
              correct: +isCorrect,
              incorrect: Math.abs(~(-1 * +isCorrect)) // Flip the bit
            };
          }
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

    return { id, items: results.length, possible: pointsPossibleInSection, correct: pointsAwardedInSection, results, categoryResults };
};
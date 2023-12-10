const { readFile, arraySum } = require("../utils");

function calculatePrevDiff(valueHistory) {
  const diffs = [];

  for (let i = 1; i < valueHistory.length; i++) {
    diffs.push(valueHistory[i] - valueHistory[i - 1]);
  }

  if (diffs.every((diff) => diff === 0)) {
    return 0;
  }

  return calculatePrevValue(diffs);
}

function calculatePrevValue(valueHistory) {
  const prevDiff = calculatePrevDiff(valueHistory);
  const firstValue = valueHistory.shift();
  return firstValue - prevDiff;
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true }).map(
    (line) => line.split(" ").map(Number)
  );

  const previousValues = lines.map(calculatePrevValue);

  const result = arraySum(previousValues);
  console.log(result);
}

module.exports = {
  solvePuzzle,
};

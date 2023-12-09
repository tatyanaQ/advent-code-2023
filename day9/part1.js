const { readFile, arraySum } = require("../utils");

function calculateNextDiff(valueHistory) {
  const diffs = [];

  for (let i = 1; i < valueHistory.length; i++) {
    diffs.push(valueHistory[i] - valueHistory[i - 1]);
  }

  if (diffs.every((diff) => diff === 0)) {
    return 0;
  }

  return calculateNextValue(diffs);
}

function calculateNextValue(valueHistory) {
  const nextDiff = calculateNextDiff(valueHistory);
  const lastValue = valueHistory.pop();
  return lastValue + nextDiff;
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true }).map(
    (line) => line.split(" ").map(Number)
  );

  const nextValues = lines.map(calculateNextValue);

  const result = arraySum(nextValues);
  console.log(result);
}

module.exports = {
  solvePuzzle,
};

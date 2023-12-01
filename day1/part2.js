const { readFile, arraySum } = require("../utils");

const digitNamesMap = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const digitsRegExps = Object.keys(digitNamesMap).map(
  (digit) => new RegExp(digit, "g")
);

function getLineCalibrationValue(line) {
  const matches = digitsRegExps
    // [[digit, index]], e.g. [['two', 0]]
    .flatMap((pattern) => Array.from(line.matchAll(pattern)))
    .filter((match) => !!match?.[0])
    .sort((match1, match2) => match1.index - match2.index);

  const firstDigit = matches[0][0];
  const lastDigit = matches[matches.length - 1][0];

  const value = digitNamesMap[firstDigit] * 10 + digitNamesMap[lastDigit];

  return value;
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });
  const calibrations = lines.map(getLineCalibrationValue);

  const result = arraySum(calibrations);
  console.log(result);
}

module.exports = {
  solvePuzzle,
};

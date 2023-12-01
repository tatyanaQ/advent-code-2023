const { readFile, arraySum } = require("../utils");

function getLineCalibrationValue(line) {
  const chars = line.split("");
  const firstDigit = chars.find((char) => !!Number(char));
  const lastDigit = chars.findLast((char) => !!Number(char));

  return Number(`${firstDigit}${lastDigit}`);
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

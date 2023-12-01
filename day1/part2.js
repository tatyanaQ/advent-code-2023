const { readFile, arraySum } = require("../utils");

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const digitNamesMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};
const digitNames = Object.keys(digitNamesMap);

const getIsDigit = (char) => digits.includes(char);

function getFirstDigit(line) {
  const chars = line.split("");
  let result = "";

  chars.find((char, index) => {
    const isDigit = getIsDigit(char);
    if (isDigit) {
      result = char;
      return true;
    }

    const isDigitName = digitNames.some((digitName) => {
      const isStartOfDigitName =
        line.slice(index, index + digitName.length) === digitName;
      if (isStartOfDigitName) {
        result = digitNamesMap[digitName];
        return true;
      }

      return false;
    });
    if (isDigitName) {
      return true;
    }

    return false;
  });

  return result;
}

function getLastDigit(line) {
  const chars = line.split("");
  let result = "";

  chars.findLast((char, index) => {
    const isDigit = getIsDigit(char);
    if (isDigit) {
      result = char;
      return true;
    }

    const isDigitName = digitNames.some((digitName) => {
      const isEndOfDigitName =
        line.slice(index - digitName.length + 1, index + 1) === digitName;
      if (isEndOfDigitName) {
        result = digitNamesMap[digitName];
        return true;
      }

      return false;
    });
    if (isDigitName) {
      return true;
    }

    return false;
  });

  return result;
}

function getLineCalibrationValue(line) {
  const firstDigit = getFirstDigit(line);
  const lastDigit = getLastDigit(line);

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

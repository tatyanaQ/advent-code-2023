const fs = require("fs");

function readFile({ fileName, separator = "\n", trimmed = false }) {
  const inputFile = fs.readFileSync(`./${fileName}`, {
    encoding: "utf-8",
  });

  const lines = inputFile.split(separator);
  return trimmed ? trimValues(lines) : lines;
}

function arraySum(array) {
  return array.reduce((sum, item) => item + sum, 0);
}

function arrayMultiplication(array) {
  return array.reduce((multiplication, item) => item * multiplication, 1);
}

function trimValues(array) {
  return array.map((value) => value.trim());
}

module.exports = {
  readFile,
  arraySum,
  arrayMultiplication,
};

const { readFile } = require("./utils");

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });
  console.log(lines);
}

module.exports = {
  solvePuzzle,
};

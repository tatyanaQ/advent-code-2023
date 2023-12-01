const { readFile } = require("./utils");

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName });
  console.log(lines);
}

module.exports = {
  solvePuzzle,
};

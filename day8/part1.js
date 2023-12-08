const { readFile } = require("../utils");

function solvePuzzle(inputFileName) {
  const [instructions, _, ...nodeLines] = readFile({
    fileName: inputFileName,
    trimmed: true,
  });

  const nodes = Object.fromEntries(
    nodeLines.map((nodeLine) => {
      const [name, leftRight] = nodeLine.split(" = ");
      const [L, R] = leftRight.replaceAll(/[()]/g, "").split(", ");

      return [name, { L, R }];
    })
  );

  let steps = 0;
  let instructionsIndex = 0;
  let instructionsLength = instructions.length;
  let currentNode = "AAA";

  while (currentNode !== "ZZZ") {
    const node = nodes[currentNode];
    currentNode = node[instructions[instructionsIndex]];

    steps++;
    instructionsIndex =
      instructionsIndex === instructionsLength - 1 ? 0 : instructionsIndex + 1;
  }

  console.log(steps);
}

module.exports = {
  solvePuzzle,
};

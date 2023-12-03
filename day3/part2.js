const { readFile, arraySum, arrayMultiplication } = require("../utils");

let maxSchematicXIndex;
let maxSchematicYIndex;

function findSurroundingNumbers({ index, lines }) {
  const [surroundingXStartIndex, surroundingXEndIndex] = getNeighboursIndexes({
    index,
    minIndex: 0,
    maxIndex: maxSchematicXIndex,
  });

  const [numbersAbove, numbersBelow] = [lines[0], lines[2]].map((line) => {
    if (!line) {
      return [];
    }

    const numberMatches = Array.from(line.matchAll(/\d+/g));

    const numbersInLine = numberMatches.map((match) => ({
      stringNumber: match[0],
      startingIndex: match.index,
      endingIndex: match.index + match[0].length - 1,
    }));

    return numbersInLine
      .filter(
        ({ startingIndex, endingIndex }) =>
          (startingIndex >= surroundingXStartIndex &&
            startingIndex <= surroundingXEndIndex) ||
          (endingIndex >= surroundingXStartIndex &&
            endingIndex <= surroundingXEndIndex)
      )
      .map(({ stringNumber }) => +stringNumber);
  });

  let numberLeft;
  if (surroundingXStartIndex === 0) {
    numberLeft = [];
  } else {
    const numberMatches = lines[1]
      .slice(0, surroundingXStartIndex + 1)
      .match(/\d+$/g);

    numberLeft = numberMatches ? [+numberMatches.slice(-1)] : [];
  }

  let numberRight;
  if (surroundingXEndIndex === maxSchematicXIndex) {
    numberRight = [];
  } else {
    const numberMatches = lines[1].slice(surroundingXEndIndex).match(/^\d+/g);

    numberRight = numberMatches ? [+numberMatches.slice(0, 1)] : [];
  }

  const numbers = numbersAbove.concat(numbersBelow, numberLeft, numberRight);
  return { numbers };
}

function getNeighboursIndexes({
  index,
  length = 1,
  minIndex,
  maxIndex,
  nullIfOutOfBoundaries = false,
}) {
  const prevIndex = index - 1;
  const nextIndex = index + length;

  return [
    prevIndex < minIndex
      ? nullIfOutOfBoundaries
        ? null
        : minIndex
      : prevIndex,
    nextIndex > maxIndex
      ? nullIfOutOfBoundaries
        ? null
        : maxIndex
      : nextIndex,
  ];
}

function findAsterisksInLine(line) {
  const asteriskMatches = Array.from(line.matchAll(/\*/g));

  return asteriskMatches.map((match) => ({
    index: match.index,
  }));
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  maxSchematicXIndex = lines[0].length - 1;
  maxSchematicYIndex = lines.length - 1;

  const asteriskEntries = lines.flatMap((line, lineIndex) =>
    findAsterisksInLine(line).map(({ index }) => ({
      index,
      lineIndex,
    }))
  );

  const asteriskNumbers = asteriskEntries.map(({ index, lineIndex }) => {
    const linesIndexes = getNeighboursIndexes({
      index: lineIndex,
      minIndex: 0,
      maxIndex: maxSchematicYIndex,
      nullIfOutOfBoundaries: true,
    });

    const relevantLines = [
      linesIndexes[0] !== null ? lines[linesIndexes[0]] : linesIndexes[0],
      lines[lineIndex],
      linesIndexes[1] !== null ? lines[linesIndexes[1]] : linesIndexes[1],
    ];

    return findSurroundingNumbers({
      index,
      lines: relevantLines,
    });
  });

  const gearsRatios = asteriskNumbers
    .filter(({ numbers }) => numbers.length === 2)
    .map(({ numbers }) => arrayMultiplication(numbers));

  const result = arraySum(gearsRatios);

  console.log(result);
}

module.exports = {
  solvePuzzle,
};

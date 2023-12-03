const { readFile, arraySum } = require("../utils");

let maxSchematicXIndex;
let maxSchematicYIndex;

function findSurroundingSymbols({ stringNumber, startingIndex, lines }) {
  const [surroundingXStartIndex, surroundingXEndIndex] = getNeighboursIndexes({
    index: startingIndex,
    length: stringNumber.length,
    minIndex: 0,
    maxIndex: maxSchematicXIndex,
  });

  const [symbolsAbove, symbolsBelow] = [lines[0], lines[2]].map((line) =>
    line ? line.slice(surroundingXStartIndex, surroundingXEndIndex + 1) : ""
  );

  const symbolLeft =
    surroundingXStartIndex === 0 ? "" : lines[1][surroundingXStartIndex];
  const symbolRight =
    surroundingXEndIndex === maxSchematicXIndex
      ? ""
      : lines[1][surroundingXEndIndex];

  const symbols = symbolsAbove.concat(symbolsBelow, symbolLeft, symbolRight);
  return { stringNumber, symbols };
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

function findNumbersInLine(line) {
  const numberMatches = Array.from(line.matchAll(/\d+/g));

  return numberMatches.map((match) => ({
    stringNumber: match[0],
    startingIndex: match.index,
  }));
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  maxSchematicXIndex = lines[0].length - 1;
  maxSchematicYIndex = lines.length - 1;

  const numberEntries = lines.flatMap((line, index) =>
    findNumbersInLine(line, index).map(({ stringNumber, startingIndex }) => ({
      stringNumber,
      startingIndex,
      lineIndex: index,
    }))
  );

  const numberEntriesWithSymbolds = numberEntries.map(
    ({ stringNumber, startingIndex, lineIndex }) => {
      const linesIndexes = getNeighboursIndexes({
        index: lineIndex,
        minIndex: 0,
        maxIndex: maxSchematicYIndex,
        nullIfOutOfBoundaries: true,
      });

      const relevantLines = [
        linesIndexes[0] ? lines[linesIndexes[0]] : linesIndexes[0],
        lines[lineIndex],
        linesIndexes[1] ? lines[linesIndexes[1]] : linesIndexes[1],
      ];

      return findSurroundingSymbols({
        stringNumber,
        startingIndex,
        lines: relevantLines,
      });
    }
  );

  const partNumbers = numberEntriesWithSymbolds
    .filter(({ symbols }) => /[^\d.]+/.test(symbols))
    .map(({ stringNumber }) => +stringNumber);

  const result = arraySum(partNumbers);

  console.log(result);
}

module.exports = {
  solvePuzzle,
};

const { readFile, arraySum } = require("../utils");

function calculateCardPoints(card) {
  const cardNumbers = card.replace(/Card\s+(\d+): /, "");

  const [winningNumbers, currentNumbers] = cardNumbers
    .split(" | ")
    .map((numberGroup) =>
      numberGroup.split(" ").filter((stringNumber) => stringNumber !== "")
    );

  const numberMatches = currentNumbers.filter((number) =>
    winningNumbers.includes(number)
  ).length;

  return numberMatches ? Math.pow(2, numberMatches - 1) : 0;
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  const cardPoints = lines.map(calculateCardPoints);

  const result = arraySum(cardPoints);
  console.log(result);
}

module.exports = {
  solvePuzzle,
};

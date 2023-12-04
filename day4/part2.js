const { readFile, arraySum } = require("../utils");

function calculateCardMatches(card) {
  const cardNumbers = card.replace(/Card\s+(\d+): /, "");

  const [winningNumbers, currentNumbers] = cardNumbers
    .split(" | ")
    .map((numberGroup) =>
      numberGroup.split(" ").filter((stringNumber) => stringNumber !== "")
    );

  return currentNumbers.filter((number) => winningNumbers.includes(number))
    .length;
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  const cardsMap = Object.fromEntries(
    "x"
      .repeat(lines.length)
      .split("")
      .map((x, index) => [index + 1, { instances: 1 }])
  );

  for (let cardId = 1; cardId <= lines.length; cardId += 1) {
    const matchingNumbers = calculateCardMatches(lines[cardId - 1]);

    if (matchingNumbers) {
      for (
        let nextCardId = cardId + 1;
        nextCardId <= cardId + matchingNumbers;
        nextCardId += 1
      ) {
        if (cardsMap[nextCardId]) {
          cardsMap[nextCardId].instances =
            cardsMap[nextCardId].instances + cardsMap[cardId].instances;
        }
      }
    }
  }

  const instances = Object.values(cardsMap).map(({ instances }) => instances);

  const result = arraySum(instances);
  console.log(result);
}

module.exports = {
  solvePuzzle,
};

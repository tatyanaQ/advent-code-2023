const { readFile, arraySum } = require("../utils");

const labels = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];

const types = [
  "highCard",
  "onePair",
  "twoPair",
  "threeOfAKind",
  "fullHouse",
  "fourOfAKind",
  "fiveOfAKind",
];

function sortAscByLabel({ hand: hand1 }, { hand: hand2 }) {
  let result = 0;

  for (let i = 0; i < 5; i++) {
    const hand1Label = hand1[i];
    const hand2Label = hand2[i];

    if (hand1Label !== hand2Label) {
      result =
        labels.findIndex((label) => label === hand1Label) -
        labels.findIndex((label) => label === hand2Label);
      break;
    }
  }

  return result;
}

function calcHandType({ hand }) {
  const map = {};
  const cards = hand.split("");

  cards.forEach((card) => {
    if (!map[card]) {
      map[card] = 0;
    }

    map[card] = map[card] + 1;
  });

  const jokersInHand = map["J"];
  if (jokersInHand && jokersInHand !== 5) {
    delete map["J"];
  }

  const labelsAmountArray = Object.values(map).sort((a, b) => a - b);
  if (jokersInHand && jokersInHand !== 5) {
    labelsAmountArray[labelsAmountArray.length - 1] =
      labelsAmountArray[labelsAmountArray.length - 1] + jokersInHand;
  }

  const labelsAmount = labelsAmountArray.join("");

  let type;

  switch (labelsAmount) {
    case "5":
      type = "fiveOfAKind";
      break;
    case "14":
      type = "fourOfAKind";
      break;
    case "23":
      type = "fullHouse";
      break;
    case "113":
      type = "threeOfAKind";
      break;
    case "122":
      type = "twoPair";
      break;
    case "1112":
      type = "onePair";
      break;
    default:
      type = "highCard";
  }

  return type;
}

function solvePuzzle(inputFileName) {
  const hands = readFile({ fileName: inputFileName, trimmed: true }).map(
    (line) => {
      const [hand, bid] = line.split(" ");
      return {
        hand,
        bid: +bid,
      };
    }
  );

  const handsByTypes = hands.reduce(
    (acc, hand) => {
      acc[calcHandType(hand)].push(hand);
      return acc;
    },
    {
      fiveOfAKind: [],
      fourOfAKind: [],
      fullHouse: [],
      threeOfAKind: [],
      twoPair: [],
      onePair: [],
      highCard: [],
    }
  );

  const sortedHands = types.flatMap((type) =>
    handsByTypes[type].sort(sortAscByLabel)
  );

  const winnings = sortedHands.map(({ bid }, index) => bid * (index + 1));

  const result = arraySum(winnings);

  console.log(result);
}

module.exports = {
  solvePuzzle,
};

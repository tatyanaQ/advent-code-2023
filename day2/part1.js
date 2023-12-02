const { readFile, arraySum } = require("../utils");

const maxCubesAmount = {
  red: 12,
  green: 13,
  blue: 14,
};

function isGamePossible({ gameId, sets }) {
  const cubeAmountExceedsLimit = sets.some((set) =>
    Object.entries(set).some(
      ([color, amount]) => amount > maxCubesAmount[color]
    )
  );

  return { gameId, isPossible: !cubeAmountExceedsLimit };
}

function parseGameLine(gameLine) {
  const gameIdRegexp = /Game (\d+): /;
  const [gameIdString, gameId] = gameLine.match(gameIdRegexp);
  const sets = gameLine
    .replace(gameIdString, "")
    .split("; ")
    .map((setString) =>
      Object.fromEntries(
        setString.split(", ").map((cubesOfColor) => {
          const [amoumt, color] = cubesOfColor.split(" ");
          return [color, +amoumt];
        })
      )
    );

  return { gameId: +gameId, sets };
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });
  const games = lines.map(parseGameLine);
  const possibleGamesIds = games
    .map(isGamePossible)
    .filter(({ isPossible }) => isPossible)
    .map(({ gameId }) => gameId);

  const result = arraySum(possibleGamesIds);
  console.log(result);
}

module.exports = {
  solvePuzzle,
};

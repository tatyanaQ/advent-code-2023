const { readFile, arraySum, arrayMultiplication } = require("../utils");

function calculateGameMinPower({ sets }) {
  const maxCubesAmount = {
    red: 0,
    green: 0,
    blue: 0,
  };

  sets.forEach((set) =>
    Object.entries(set).forEach(([color, amount]) => {
      if (amount > maxCubesAmount[color]) {
        maxCubesAmount[color] = amount;
      }
    })
  );

  return arrayMultiplication(Object.values(maxCubesAmount));
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
  const gamesMinPowers = games.map(calculateGameMinPower);

  const result = arraySum(gamesMinPowers);
  console.log(result);
}

module.exports = {
  solvePuzzle,
};

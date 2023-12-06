const { readFile, arrayMultiplication } = require("../utils");

function solvePuzzle(inputFileName) {
  const [times, distances] = readFile({
    fileName: inputFileName,
    trimmed: true,
  }).map((line) => line.split(":")[1].trim().split(/\s+/).map(Number));

  const waysToWin = times.map((time, raceIndex) => {
    let waysToWinCounter = 0;

    for (let holdingTime = 0; holdingTime <= time; holdingTime++) {
      const distance = (time - holdingTime) * holdingTime;
      if (distance > distances[raceIndex]) {
        waysToWinCounter++;
      }
    }

    return waysToWinCounter;
  });

  const result = arrayMultiplication(waysToWin);

  console.log(result);
}

module.exports = {
  solvePuzzle,
};

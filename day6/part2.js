const { readFile, arrayMultiplication } = require("../utils");

function solvePuzzle(inputFileName) {
  const [time, distanceRecord] = readFile({
    fileName: inputFileName,
    trimmed: true,
  }).map((line) => Number(line.split(":")[1].replaceAll(/\s+/g, "")));

  let waysToWin = 0;

  for (let holdingTime = 0; holdingTime <= time; holdingTime++) {
    const distance = (time - holdingTime) * holdingTime;
    if (distance > distanceRecord) {
      waysToWin++;
    }
  }

  const result = waysToWin;

  console.log(result);
}

module.exports = {
  solvePuzzle,
};

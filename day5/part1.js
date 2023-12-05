const { readFile } = require("../utils");

function mapValue(map, value) {
  const rule = map.find(
    ({ source, length }) => value >= +source && value < +source + +length
  );
  if (!rule) {
    return value;
  }

  const offset = value - rule.source;
  return +rule.destination + offset;
}

function solvePuzzle(inputFileName) {
  const lines = readFile({
    fileName: inputFileName,
    separator: "\r\n\r\n",
    trimmed: true,
  });

  const seeds = lines.shift().replace("seeds: ", "").split(" ");

  const maps = lines.map((line) => {
    const mapRowsLine = line.split(":")[1].trim();

    return mapRowsLine.split("\r\n").map((mapRowLine) => {
      const [destination, source, length] = mapRowLine.split(" ");
      return {
        destination,
        source,
        length,
      };
    });
  });

  const results = seeds.map((seed) => {
    let result = seed;

    for (let i = 0; i < maps.length; i++) {
      result = mapValue(maps[i], result);
    }

    return result;
  });

  const result = Math.min(...results);

  console.log(result);
}

module.exports = {
  solvePuzzle,
};

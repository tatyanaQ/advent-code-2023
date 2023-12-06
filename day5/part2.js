const { readFile } = require("../utils");

function mapRange(range, rules) {
  const rangesToMap = [range];
  const mappedNewRanges = [];

  while (rangesToMap.length) {
    const rangeToMap = rangesToMap.shift();
    const { destinationStart, destinationEnd } = rangeToMap;

    let anyRuleApplied = false;

    rules.forEach((rule) => {
      // rule covers all range
      if (
        rule.sourceStart <= destinationStart &&
        rule.sourceEnd >= destinationEnd
      ) {
        anyRuleApplied = true;

        mappedNewRanges.push({
          destinationStart: rule.sourceToDestination(destinationStart),
          destinationEnd: rule.sourceToDestination(destinationEnd),
        });
      } else if (
        // rule starts inside range
        rule.sourceStart > destinationStart &&
        rule.sourceStart <= destinationEnd &&
        rule.sourceEnd >= destinationEnd
      ) {
        anyRuleApplied = true;

        mappedNewRanges.push({
          destinationStart: rule.sourceToDestination(rule.sourceStart),
          destinationEnd: rule.sourceToDestination(destinationEnd),
        });

        rangesToMap.push({
          destinationStart,
          destinationEnd: rule.sourceStart - 1,
        });
      } else if (
        // rule ends inside range
        rule.sourceStart <= destinationStart &&
        rule.sourceEnd >= destinationStart &&
        rule.sourceEnd < destinationEnd
      ) {
        anyRuleApplied = true;

        mappedNewRanges.push({
          destinationStart: rule.sourceToDestination(destinationStart),
          destinationEnd: rule.sourceToDestination(rule.sourceEnd),
        });

        rangesToMap.push({
          destinationStart: rule.sourceEnd + 1,
          destinationEnd,
        });
      } else if (
        // rule starts and ends inside range
        rule.sourceStart > destinationStart &&
        rule.sourceEnd < destinationEnd
      ) {
        anyRuleApplied = true;

        mappedNewRanges.push({
          destinationStart: rule.sourceToDestination(rule.sourceStart),
          destinationEnd: rule.sourceToDestination(rule.sourceEnd),
        });

        rangesToMap.push(
          {
            destinationStart,
            destinationEnd: rule.sourceStart - 1,
          },
          {
            destinationStart: rule.sourceEnd + 1,
            destinationEnd,
          }
        );
      }
    });

    if (!anyRuleApplied) {
      mappedNewRanges.push(rangeToMap);
    }
  }

  return mappedNewRanges;
}

function solvePuzzle(inputFileName) {
  const lines = readFile({
    fileName: inputFileName,
    separator: "\r\n\r\n",
    trimmed: true,
  });

  const seedNumbers = lines.shift().replace("seeds: ", "").split(" ");

  let seedRanges = [];

  for (let i = 0; i < seedNumbers.length; i++) {
    if (i % 2 === 0) {
      const sourceStart = +seedNumbers[i];
      const rangeLength = +seedNumbers[i + 1];
      const sourceEnd = sourceStart + rangeLength - 1;

      seedRanges.push({
        destinationStart: sourceStart,
        destinationEnd: sourceEnd,
      });
    } else {
      continue;
    }
  }

  lines.forEach((line) => {
    const mapRowsLine = line.split(":")[1].trim();

    const rules = mapRowsLine.split("\r\n").map((mapRowLine) => {
      const [destination, source, length] = mapRowLine.split(" ");
      return {
        sourceStart: +source,
        sourceEnd: +source + +length - 1,
        destinationStart: +destination,
        destinationEnd: +destination + +length - 1,
        sourceToDestination: (value) => value + +destination - +source,
      };
    });

    seedRanges = seedRanges.flatMap((seedRange) => mapRange(seedRange, rules));
  });

  console.log(seedRanges);

  const destinationStarts = seedRanges
    .map(({ destinationStart }) => destinationStart)
    .sort((a, b) => a - b);

  const result = destinationStarts[0];
  console.log(result);
}

module.exports = {
  solvePuzzle,
};

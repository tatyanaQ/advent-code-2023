const { readFile } = require("../utils");

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  const dotRowsIndexes = [];

  const galaxies = [];

  lines.forEach((line, index) => {
    if (/^\.+$/.test(line)) {
      dotRowsIndexes.push(index);
    }

    const matches = (Array.from(line.matchAll(/#/g)) || []).map(
      ({ index }) => index
    );
    if (matches) {
      galaxies.push(...matches.map((column) => ({ row: index, column })));
    }
  });

  const dotColumsIndexes = [];

  for (let i = 0; i < lines[0].length; i++) {
    const column = lines.map((line) => line[i]).join("");

    if (/^\.+$/.test(column)) {
      dotColumsIndexes.push(i);
    }
  }

  let distancesSum = 0;

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const rowDelta = galaxies[j].row - galaxies[i].row;
      const columnDelta = Math.abs(galaxies[j].column - galaxies[i].column);

      let distance = rowDelta + columnDelta;

      const doubleRowsAmount = dotRowsIndexes.filter(
        (rowIndex) => rowIndex > galaxies[i].row && rowIndex < galaxies[j].row
      ).length;

      distance = distance + doubleRowsAmount;

      const doubleColumnsAmount = dotColumsIndexes.filter(
        (rowColumn) =>
          rowColumn > Math.min(galaxies[i].column, galaxies[j].column) &&
          rowColumn < Math.max(galaxies[i].column, galaxies[j].column)
      ).length;

      distance = distance + doubleColumnsAmount;

      distancesSum = distancesSum + distance;
    }
  }

  console.log(distancesSum);
}

module.exports = {
  solvePuzzle,
};

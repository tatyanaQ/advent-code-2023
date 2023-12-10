const { readFile } = require("../utils");

const labelsMap = {
  openUp: ["|", "L", "J"],
  openRight: ["-", "L", "F"],
  openDown: ["|", "7", "F"],
  openLeft: ["-", "J", "7"],
};

const checksMap = {
  checkUp: {
    currentTileProp: "openUp",
    testedTileProp: "openDown",
    testedTileRow: (row) => row - 1,
    testedTileColumn: (column) => column,
  },
  checkRight: {
    currentTileProp: "openRight",
    testedTileProp: "openLeft",
    testedTileRow: (row) => row,
    testedTileColumn: (column) => column + 1,
  },
  checkDown: {
    currentTileProp: "openDown",
    testedTileProp: "openUp",
    testedTileRow: (row) => row + 1,
    testedTileColumn: (column) => column,
  },
  checkLeft: {
    currentTileProp: "openLeft",
    testedTileProp: "openRight",
    testedTileRow: (row) => row,
    testedTileColumn: (column) => column - 1,
  },
};

const checks = Object.keys(checksMap);

const oppositChecksMap = {
  checkUp: "checkDown",
  checkDown: "checkUp",
  checkRight: "checkLeft",
  checkLeft: "checkRight",
};

function check(checkConfig, currentTileLabel, testedTileLabel) {
  if (
    !testedTileLabel ||
    (!labelsMap[checkConfig.currentTileProp].includes(currentTileLabel) &&
      currentTileLabel !== "S")
  ) {
    return;
  }

  if (
    labelsMap[checkConfig.testedTileProp].includes(testedTileLabel) ||
    testedTileLabel === "S"
  ) {
    return testedTileLabel;
  }
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  const sTileRowIndex = lines.findIndex((line) => line.includes("S"));
  const sTileColumnIndex = lines[sTileRowIndex]
    .split("")
    .findIndex((tile) => tile === "S");

  let tilesCount = 0;

  let prevSuccessfulCheck = "";

  let currentTile = {
    label: "S",
    row: sTileRowIndex,
    column: sTileColumnIndex,
  };

  do {
    const { label, row, column } = currentTile;

    for (let i = 0; i < checks.length; i++) {
      if (
        prevSuccessfulCheck &&
        prevSuccessfulCheck === oppositChecksMap[checks[i]]
      ) {
        continue;
      }

      const checkConfig = checksMap[checks[i]];
      const testedTileRow = checkConfig.testedTileRow(row);
      const testedTileColumn = checkConfig.testedTileColumn(column);

      const tileLabel = check(
        checkConfig,
        label,
        lines[testedTileRow]?.[testedTileColumn]
      );

      if (tileLabel) {
        tilesCount++;
        currentTile = {
          label: tileLabel,
          row: testedTileRow,
          column: testedTileColumn,
        };
        prevSuccessfulCheck = checks[i];

        break;
      }
    }
  } while (currentTile.label !== "S");

  // S is counted on the last step
  tilesCount--;

  const result = Math.ceil(tilesCount / 2);

  console.log(result);
}

module.exports = {
  solvePuzzle,
};

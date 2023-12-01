const exampleFileName = "input_example";
const testFileName = "input";

// day=1 part=1 or day1 part1
const [dayArg, partArg] = process.argv.slice(2);

const day = dayArg.replace("=", "");
const part = partArg.replace("=", "");
const fileName = process.env.INPUT || exampleFileName;

async function main() {
  const puzzleModule = `./${day}/${part}`;
  const { solvePuzzle } = require(puzzleModule);

  await solvePuzzle(fileName);
}

main()
  .then(() => console.log("Done"))
  .catch((err) => console.error("Error", err));

const { readFile } = require("./utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = process.env.INPUT || exampleFileName;

function main() {
  const lines = readFile(fileName);
}

main();

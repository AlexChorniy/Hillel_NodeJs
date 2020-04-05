const { readdirSync } = require("fs");
const { extname } = require("path");
const chalk = require("chalk");

console.log("EXT", process.env.EXT);
console.log("AGV", process.argv);

const files = readdirSync(__dirname);
for (const file of files) {
  if (extname(file) === ".json") {
    console.log(chalk.magenta(file));
  } else {
    console.log(file);
  }
}

setInterval(() => {}, 10000);

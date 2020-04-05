const { readdirSync } = require("fs");
const { extname } = require("path");
const chalk = require("chalk");

const files = readdirSync(__dirname);
for (const file of files) {
  if (extname(file) === ".json") {
    console.log(chalk.magenta(file));
  } else {
    console.log(file);
  }
}

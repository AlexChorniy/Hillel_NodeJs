require("dotenv").config();
const { platform } = process;
const { homedir } = require("os");
const commander = require("commander");
const program = new commander.Command();

program
  .version("0.0.1")
  .option("-f, --fileName <fName>", "fileName")
  .option("-d, --deep <number>", "deep")
  .option("-c, --path <path>", "path")
  .option("-l, --colors <items>", "colors", collect)
  .option("-m,--name <matrix>", "file's matrix", matrix);
program.parse(process.argv);
function collect(value) {
  const delSquareBrackets = value.trim().replace(/[[\]]/g, "");
  const changeToArr = delSquareBrackets.trim().split(",");
  return changeToArr;
}
function matrix(fname) {
  fArr = fname
    .trim()
    .replace(/[*]/g, "")
    .replace(/[\\]/g, ",")
    .split(",")
    .map(item => (item === "" ? "*" : item));
  const name = fArr[0];
  const ext = fArr[1];
  const result = name && ext ? { name, ext } : false;
  return result;
}
let HOME = homedir();
const thisPlatform = platform;
if (thisPlatform === "win32") HOME = HOME.replace(/\\/g, "\\\\");
const defaultExt = JSON.stringify([".mp3", ".xml", ".js", ".txt"]);
const defaultColors = ["red", "green", "blue"];
exports.deep = Number(program.deep) || 0;
exports.fileName = program.fileName || "app";
exports.colors = program.colors || defaultColors;
exports.path = program.path || HOME;
exports.ext = process.env.EXT || JSON.parse(defaultExt);
exports.fullName = program.name || { name: "*", ext: ".js" };

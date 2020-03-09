require('dotenv').config();
const { env, argv, platform } = process;
const { homedir } = require('os');
const commander = require('commander');
const program = new commander.Command();

program
    .version('0.0.1')
    .option('-n, --fileName <name>', 'fileName')
    .option('-d, --deep <number>', 'deep')
    .option('-c, --path <path>', 'path')
    .option('-l, --colors <items>', 'colors', collect)
program.parse(process.argv);
function collect(value) {
    const delSquareBrackets = value.trim().replace(/[[\]]/g, '');
    const changeToArr = delSquareBrackets.trim().split(',');
    return changeToArr;
}

let HOME = homedir();
const thisPlatform = platform;
if (thisPlatform === "win32") HOME = HOME.replace(/\\/g, "\\\\");

const defaultExt = JSON.stringify(['.mp3', '.xml', '.js', '.txt'])
const defaultColors = ['red', 'green', 'blue'];
exports.deep = Number(program.deep) || 0;
exports.fileName = program.fileName || 'app';
exports.colors = program.colors || defaultColors;
exports.path = program.path || HOME;
exports.ext = process.env.EXT || JSON.parse(defaultExt);
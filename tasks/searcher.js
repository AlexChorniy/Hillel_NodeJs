require('dotenv').config();
const { workWithFiles, transformArgv, transformToArray, colors } = require("../helpers");
const { normalize, sep, extname } = require('path'), { readdirSync } = require('fs');
const deep = +transformArgv('deep') || 0;
const color = transformToArray(transformArgv('colors')) || ['green'];
const pathFromArgv = transformArgv('path') || __dirname;
console.log(`${colors.green}%s${colors.reset}`, pathFromArgv);
let currentCount = 0;
function makeCounter() {
    return function () {
        return currentCount++;
    };
}
let counter = makeCounter();

function fileSearcher(path) {
    const normalizedPath = normalize(path);
    const readDir = readdirSync(normalizedPath);
    const pathToDirInArr = normalizedPath.split(sep);
    const ext = process.env.EXT;
    for (const element of readDir) {
        if (!!extname(element)) {
            workWithFiles(element, ext);
        } else if (!deep || deep >= currentCount) { // TODO
            const pathToThisElement = [...pathToDirInArr, element].join(sep);
            if (__dirname === path) currentCount = 1;
            counter();
            fileSearcher(pathToThisElement);
        }
    }
}

fileSearcher(pathFromArgv);

// setInterval(() => { }, 10000);

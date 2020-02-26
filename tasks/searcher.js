require('dotenv').config();
const { normalize, sep, extname } = require('path'), { readdirSync } = require('fs');
const { workWithFiles, transformArgv, transformToArray } = require("../assets/helpers");
const deep = +transformArgv('deep') || 0;
const colorArr = transformToArray(transformArgv('colors')) || ['green'];
const pathFromArgv = transformArgv('path') || __dirname;
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
            workWithFiles(element, ext, colorArr[currentCount % colorArr.length]);
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

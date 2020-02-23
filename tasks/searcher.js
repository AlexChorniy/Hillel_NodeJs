require('dotenv').config();
const { workWithFiles } = require("../helpers");
const { normalize, sep, extname } = require('path'), { readdirSync } = require('fs');
const deep = +process.argv[5].split('=')[1];
const pathFromArgv = process.argv[6].split('=')[1].toString();

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
            const pathToThisElement = [...pathToDirInArr, element].join(sep)
            if (__dirname === path) currentCount = 1;
            counter();
            fileSearcher(pathToThisElement);
        }
    }
}

fileSearcher(pathFromArgv);

// setInterval(() => { }, 10000);

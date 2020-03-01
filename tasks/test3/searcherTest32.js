require('dotenv').config();
const { normalize, sep, extname } = require('path'), { readdirSync } = require('fs');
// console.log("EXT", typeof process.env.EXT);
// console.log("ARG", process.argv);
// const dirsPath = path.dirname(__dirname);

const workWithFiles = (fileName, ext) => {
    const replacer = (match, p1, p2) => {
        if (p2.length > 2 && match === '[') return '["'; // TODO p2.length > 2
        else if (p2.length > 2 && match === ']') return '"]'; // TODO p2.length > 2
        else if (match === ',') return '","';
        else return match;
    };
    const extToJSON = ext.trim().replace(/[[\],]/g, replacer);
    const extToArr = JSON.parse(extToJSON);
    if (extToArr.length && extToArr.length > 0) { extToArr.map(extItem => extname(fileName) === extItem ? console.log(fileName) : '') }
    else if (!extToArr.length) { console.log(fileName, extToArr) }
    else console.log('The EXT value must be an array')
}

function fileSearcher(path) {
    const normalizedPath = normalize(path);
    const readDir = readdirSync(normalizedPath);
    const pathToDirInArr = normalizedPath.split(sep);
    const ext = process.env.EXT;
    for (const element of readDir) {
        const pathToThisElement = [...pathToDirInArr, element].join(sep)
        if (!!extname(element)) {
            workWithFiles(element, ext);
        } else {
            fileSearcher(pathToThisElement);
        }
    }
}

fileSearcher(__dirname);

// setInterval(() => { }, 10000);


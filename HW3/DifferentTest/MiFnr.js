require('dotenv').config();
const { normalize, sep, extname } = require('path'), { readdir, isDirectory, isFile, statSync } = require('fs');
const EventEmitter = require("events");
const program = require('commander');
const { colors } = require('../assets/colors');
const seacher = require('./earcher');

program
    .option('--fileName', 'fileName')
    .option('--deep', 'deep')
    .option('--path', 'path')
    .option('--colors', 'colors')
program.parse(process.argv);

const deep = Number(program.args[0]) || 0;
const fileName = program.args[1];
const colours = program.args[2] || ['red', 'green', 'blue'];
const path = program.args[3] || __dirname;
const ext = process.env.EXT || [".mp3", ".xml", ".js", ".txt"];

class Finder extends EventEmitter {
    constructor(pathValue, deepValue, coloursValue, fileNameValue, extValue) {
        super();
        this._pathValue = pathValue;
        this._deepValue = deepValue;
        this._coloursValue = coloursValue;
        this._fileNameValue = fileNameValue;
        this._extValue = extValue;
        this.once("parse", this.parse);
        setTimeout(() => {
            this.emit("started");
        }, 1);
    }
    async parse() {
        await seacher(
            this._pathValue,
            this._deepValue,
            this._coloursValue,
            this._fileNameValue,
            this._extValue,
            this.emit.bind(this)
        )();
    }

};

const finder = new Finder(path, deep, colours, fileName, ext);

finder.once("started", () => {
    console.log("started");
    finder.emit("parse");
});

finder.once("finished", () => {
    console.log("finished");
});

finder.once("file", () => {
    console.log("file");
});

finder.once("processing", () => {
    console.log("processing");
});




// parse(pathValue, deepValue, coloursValue, fileNameValue, extValue) {
//     this.dirArr = [];
//     const readDirVal = readdir(pathValue);
//     console.log("parse", readDirVal);        
//     const colourValue = colors[colorsValue[this.currentCount % colorsValue.length]]
//     for (const element of readDir) {
//         this.isAllowed = false;
//         const pathToEl = [pathValue, element].join(sep);
//         const isDir = statSync(pathToEl).isDirectory();
//         const isFile = statSync(pathToEl).isFile();
//         if (isFile) {
//             extValue.map(ext => (ext === extname(element) && `${fileNameValue}${ext}` === element) ? this.isAllowed = true : '');
//             (!extValue.length || this.isAllowed) ? console.log(`${colourValue}%s${colors.reset}`, element) : ''
//         } else if (isDir) {
//             this.dirArr = [...this.dirArr, element];
//             // console.log(`${colourValue}%s${colors.reset}`, element, this.currentCount);
//         }
//     }
//     return this.dirArr;

// require('dotenv').config();
// const { normalize, sep, extname } = require('path'), { readdirSync } = require('fs');
// const { workWithFiles, transformArgv, transformToArray } = require("../assets/helpers");
// const deep = +transformArgv('deep') || 0;
// const colorArr = transformToArray(transformArgv('colors')) || ['green'];
// const pathFromArgv = transformArgv('path') || __dirname;
// let currentCount = 0;
// function makeCounter() {
//     return function () {
//         return currentCount++;
//     };
// }
// let counter = makeCounter();

// function fileSearcher(path) {
//     const normalizedPath = normalize(path);
//     const readDir = readdirSync(normalizedPath);
//     const pathToDirInArr = normalizedPath.split(sep);
//     const ext = process.env.EXT;
//     for (const element of readDir) {
//         if (!!extname(element)) {
//             workWithFiles(element, ext, colorArr[currentCount % colorArr.length]);
//         } else if (!deep || deep >= currentCount) { // TODO
//             const pathToThisElement = [...pathToDirInArr, element].join(sep);
//             if (__dirname === path) currentCount = 1;
//             counter();
//             fileSearcher(pathToThisElement);
//         }
//     }
// }

// fileSearcher(pathFromArgv);

// setInterval(() => { }, 10000);

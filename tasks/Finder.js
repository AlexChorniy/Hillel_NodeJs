require('dotenv').config();
const { normalize, sep, extname } = require('path'), { readdirSync, isDirectory, isFile, statSync } = require('fs');
const EventEmitter = require("events");
const program = require('commander');
const { readdir } = require("fs");
const { colors } = require('../assets/colors');

program
    .option('--fileName', 'fileName')
    .option('--deep', 'deep')
    .option('--path', 'path')
    .option('--colors', 'colors')
program.parse(process.argv)

const deep = Number(program.args[0]) || 0;
const fileName = program.args[1];
const colours = program.args[2] || ['red', 'green', 'blue'];
const path = program.args[3] || __dirname;
const ext = process.env.EXT || [".mp3", ".xml", ".js", ".txt"];
console.log('readDir', __dirname);
class Finder extends EventEmitter {
    constructor() {
        super();
        this.on("start", function (pathValue, deepValue, colorsValue, fileNameValue, extValue) {
            console.log("start");
            const colorsToArr = colorsValue.replace(/[[\]]/g, '').split(',');
            const extValueToArr = JSON.parse(extValue) || ["magenta"];
            this.parse(pathValue, deepValue, colorsToArr, fileNameValue, extValueToArr);
        })
        // setTimeout(() => {
        //     // console.log('listenerCount', EventEmitter.listenerCount(finder, 'files'));
        //     finder.once('removeListener', (event, listener) => {
        //         console.log('newListener', finder.listeners('files'));
        //         console.log('removeListener', event, listener);
        //     })
        // }, 2000);
        this.currentCount = 0;
        this.dirArr = [];
        this.initialPath = path;
        this.dirParse = [];
        this.isAllowed = false;
    }
    parse(pathValue, deepValue, colorsValue, fileNameValue, extValue) {
        const normalizedPath = normalize(pathValue);
        const pathToDirInArr = normalizedPath.split(sep);
        this.dirParse = this.readDir(normalizedPath, colorsValue, fileNameValue, extValue);
        if ((!deepValue || this.currentCount < deepValue) && this.dirParse.length > 0) {
            this.currentCount += 1;
            for (const element of this.dirParse) {
                if (this.initialPath === pathValue) this.currentCount = 1;
                const pathToThatElement = [...pathToDirInArr, element].join(sep);
                this.parse(pathToThatElement, deepValue, colorsValue, fileNameValue, extValue);
            }
        }
    }
    readDir(pathValue, colorsValue, fileNameValue, extValue) {
        this.dirArr = [];
        const readDir = readdirSync(pathValue);
        const colourValue = colors[colorsValue[this.currentCount % colorsValue.length]]
        for (const element of readDir) {
            this.isAllowed = false;
            const pathToEl = [pathValue, element].join(sep);
            const isDir = statSync(pathToEl).isDirectory();
            const isFile = statSync(pathToEl).isFile();
            if (isFile) {
                extValue.map(ext => (ext === extname(element) && `${fileNameValue}${ext}` === element) ? this.isAllowed = true : '');
                (!extValue.length || this.isAllowed) ? console.log(`${colourValue}%s${colors.reset}`, element) : ''
            } else if (isDir) {
                this.dirArr = [...this.dirArr, element];
                // console.log(`${colourValue}%s${colors.reset}`, element, this.currentCount);
            }
        }
        return this.dirArr;
    }
}

const finder = new Finder();

// finder.on("noMatches", () => {
//     // console.log('No matches!')
// });

finder.on("files", data => {
    console.log(`${data.colourValue}%s${colors.reset}`, data.element, data.pathValue);
});

finder.emit("start", path, deep, colours, fileName, ext);
console.log('finished');

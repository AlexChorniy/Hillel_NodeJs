const { extname } = require('path');
const chalk = require('chalk');

exports.workWithFiles = (fileName, ext) => {
    const extToArr = transformToArray(ext);
    if (extToArr.length && extToArr.length > 0) {
        extToArr.map(extItem => {
            extname(fileName) === extItem
                ? console.log(chalk.magenta(fileName))
                : ''
        })
    }
    else if (!extToArr.length) {
        console.log(chalk.magenta(fileName));
    }
    else {
        console.log('The EXT value must be an array');
    }
};

exports.transformArgv = (string) => {
    const argv = process.argv;
    const filterOut = argv.filter(item => item.split('=')[0].split('--')[1] === string ? item : '')[0];
    const result = filterOut ? filterOut.split('=')[1] : false;
    return result;
};

transformToArray = ext => {
    const replacer = (match, p1, p2) => {
        if (p2.length > 2 && match === '[') return '["'; // TODO p2.length > 2
        else if (p2.length > 2 && match === ']') return '"]'; // TODO p2.length > 2
        else if (match === ',') return '","';
        else return match;
    };
    const extToJSON = ext.trim().replace(/[[\],]/g, replacer);
    const extToArr = JSON.parse(extToJSON);
    return extToArr;
};

exports.transformToArray = ext => {
    const replacer = (match, p1, p2) => {
        if (p2.length > 2 && match === '[') return '["'; // TODO p2.length > 2
        else if (p2.length > 2 && match === ']') return '"]'; // TODO p2.length > 2
        else if (match === ',') return '","';
        else return match;
    };
    const extToJSON = ext.trim().replace(/[[\],]/g, replacer);
    const extToArr = JSON.parse(extToJSON);
    return extToArr;
};

exports.colors = {
    "reset": "\033[0m",
    "hicolor": "\033[1m",
    "underline": "\033[4m",
    "inverse": "\033[7m",
    // foreground colors
    "black": "\033[30m",
    "red": "\033[31m",
    "green": "\033[32m",
    "yellow": "\033[33m",
    "blue": "\033[34m",
    "magenta": "\033[35m",
    "cyan": "\033[36m",
    "white": "\033[37m",
    // background colors
    "bg_black": "\033[40m",
    "bg_red": "\033[41m",
    "bg_green": "\033[42m",
    "bg_yellow": "\033[43m",
    "bg_blue": "\033[44m",
    "bg_magenta": "\033[45m",
    "bg_cyan": "\033[46m",
    "bg_white": "\033[47m"
}

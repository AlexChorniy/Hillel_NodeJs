const { extname } = require('path');
const chalk = require('chalk');

exports.workWithFiles = (fileName, ext) => {
    const replacer = (match, p1, p2) => {
        if (p2.length > 2 && match === '[') return '["'; // TODO p2.length > 2
        else if (p2.length > 2 && match === ']') return '"]'; // TODO p2.length > 2
        else if (match === ',') return '","';
        else return match;
    };
    const extToJSON = ext.trim().replace(/[[\],]/g, replacer);
    const extToArr = JSON.parse(extToJSON);
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

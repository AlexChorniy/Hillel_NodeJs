const { extname } = require('path');
const { paintFiles } = require('./paint');

exports.workWithFiles = (fileName, ext, color) => {
    const extToArr = transformToArray(ext);
    if (extToArr.length && extToArr.length > 0) {
        extToArr.map(extItem => {
            extname(fileName) === extItem
                ? paintFiles(fileName, color)
                : ''
        })
    }
    else if (!extToArr.length) {
        paintFiles(fileName, color);
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



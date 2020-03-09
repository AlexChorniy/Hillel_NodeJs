// const startParse = require('./tasks/Searcher');
const { deep, fileName, path, colors, ext } = require('./assets/parseParams');
const Finder = require('./ee');

// const files = startParse(deep, fileName, path, colors, ext)();
const fl = new Finder(deep, fileName, path, colors, ext);

fl.once('started', () => {
    // fl.parse();
    fl.emit('parse');

});

fl.on('file', () => {
    console.log('Recieve file', file);
});

fl.on('processing', data => {
    console.log('DATA', data);
});

fl.once('finished', () => {
    console.log('Parsing finished');
});

// for (const file of files) {
//     console.log('app', file);
// }


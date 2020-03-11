const { join, relative } = require('path');
const { createReadStream } = require('fs');
const FileType = require('file-type');
const readChunk = require('read-chunk');
const { extname } = require('path');
const { fullName } = require('../assets/parseParams');

function Searcher(itemName, path) {
    const name = fullName.name;
    const ext = fullName.ext;
    const reg = new RegExp(`^${name === '\*' ? '.' : name}${name.includes(' ? ') ? '?' : ''}\\w*\\W*${ext}$`, 'ig');
    const isMatch = !!itemName.match(reg);
    if (isMatch) {
        console.log('FileTypeTrue', name, itemName, ext);
        // const fullPath = join(path, itemName);

        return true;
    }
    return false;
}

module.exports = Searcher;


// const got = require('got');
// const FileType = require('file-type');

// const url = 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg';

// (async () => {
//     const stream = got.stream(url);

//     console.log(await FileType.fromStream(stream));
//     //=> {ext: 'jpg', mime: 'image/jpeg'}
// })();

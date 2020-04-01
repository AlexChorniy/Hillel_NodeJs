const { readFile } = require('fs');
const { main } = require('../view/main');

exports.root = (res) => {
    res.setHeader('content-type', 'text/html');
    res.write(`${main()}`);
};

exports.rootScript = (res, path) => {
    // res.setHeader('content-type', 'text/javascript');
    return readFile(path, (err, data) => {
        if (!err) {
            res.write(data);
            res.end();
        }
    });
};

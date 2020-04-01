const { readFile } = require('fs');
const { main } = require('../view/main');

exports.root = function (res) {
    res.setHeader('content-type', 'text/html');
    res.write(`${main()}`);
};

exports.rootScript = function (res, path) {
    // res.setHeader('content-type', 'text/javascript');
    return readFile(path, (err, data) => {
        if (!err) {
            res.write(data);
            res.end();
        }
    });
};

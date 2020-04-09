const { readFile } = require('fs');
const { main } = require('../view/main');


module.exports = {
    root: (res, fn) => {
        function fn() {
            res.setHeader(
                'Content-Type', 'text/html',
                'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Origin', '*'
            );
            res.write(main());
            res.sendStatus = 204;
            //res.end();
        };
        fn();
    },
    rootScript: (res, path, fn) => {
        function fn() {
            readFile(path, 'utf8', (err, data) => {
                //res.setHeader('Content-Type', 'text/javascript');
                res.write(data);
                res.sendStatus = 204;
                res.end();
            });
            return res.sendStatus = 200;
        };
        return fn();
    },

};

// exports.root = function (res) {
//     res.setHeader('content-type', 'text/html');
//     res.write(`${main()}`);
// };

// exports.rootScript = function (res, path) {
//     return readFile(path, (err, data) => {
//         if (!err) {
//             res.write(data);
//             res.end();
//         }
//     });
// };

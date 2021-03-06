const http = require('http');
const { join, normalize } = require('path');
const process = require('process');
const childProcess = require('child_process');
const { watch, createReadStream, readFile } = require('fs');
const { main } = require('./dev/components/view/main');
const { rootScript, root } = require('./dev/components/js/routes');

const PORT = 8080;
const HOST = '127.0.0.1';
const SCRIPT_PATH = join(__dirname, 'dev', 'components', 'js');
const FRONT_SCRIPT_PATH = join('/', 'front.js');
const FULL_SCRIPT_PATH = join(SCRIPT_PATH, FRONT_SCRIPT_PATH);

const server = http.createServer((req, res) => {
    const { method } = req;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const { pathname } = url;
    const normalizePathname = normalize(pathname);
    const rootRoute = join('/');

    console.log(normalizePathname);

    // if (url) {
    //     const rootCheck = {
    //         [rootRoute]: root(res, null),
    //         [FRONT_SCRIPT_PATH]: rootScript(res, FULL_SCRIPT_PATH, null),
    //     };
    //     console.log(FRONT_SCRIPT_PATH, normalizePathname);
    //     rootCheck[normalizePathname];
    // }

    if (normalizePathname === rootRoute) {
        // const readableStream = createReadStream(join(SCRIPT_PATH, FRONT_SCRIPT_PATH));
        res.setHeader('content-type', 'text/html');
        res.write(`${main()}`);
        res.end();
    } else if (normalizePathname === FRONT_SCRIPT_PATH) {
        res.setHeader('content-type', 'text/javascript');
        readFile(join(SCRIPT_PATH, FRONT_SCRIPT_PATH), (err, data) => {
            if (!err) {
                res.write(data);
                res.end();
            }
        });
    }
});

server.listen(PORT, HOST, () => {
    const adress = server.address();
    console.log(`Server is listening on port ${adress.port}`);
});

// watch('app.js', (eventType, filename) => {
//     childProcess.kill();
//     cpServer = childProcess.fork(filename);
//     console.log(typeof filename);
// });

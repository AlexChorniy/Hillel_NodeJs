const http = require('http');
const { join, normalize } = require('path');
const process = require('process');
const childProcess = require('child_process');
const fs = require('fs');
const { main } = require('./dev/components/view/main');

const PORT = 8080;
const HOST = '127.0.0.1';

const server = http.createServer(async (req, res) => {
    const { method } = req;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const { pathname } = url;
    const normalizePathname = normalize(pathname);
    const rootRoute = join('/');

    if (normalizePathname === rootRoute) {
        res.setHeader('content-type', 'text/html');
        res.write(`${main()}`);
        res.end();
    }

});

server.listen(PORT, HOST, () => {
    const adress = server.address();
    console.log(`Server is listening on port ${adress.port}`);
});

fs.watch('app.js', (eventType, filename) => {
    childProcess.kill();
    cpServer = childProcess.fork(filename);
    console.log(typeof filename);
});

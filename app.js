const http = require('http');
const { join, normalize } = require('path');
const { createReadStream } = require('fs');
const chat = require('./assets/chat');

const PORT = 8080;
const HOST = '127.0.0.1';
const FRONT_PATH = join(__dirname, 'front');
const ROOT_HTML_PATH = join(FRONT_PATH, 'index.html');
const FRONT_SCRIPT_PATH = join('/', 'main.js');
const FULL_SCRIPT_PATH = join(FRONT_PATH, FRONT_SCRIPT_PATH);

const PUBLISH_URL = join('\\', 'publish');
const SUBSCRIBE_URL = join('\\', 'subscribe');

const server = http.createServer((req, res) => {
    const { method } = req;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const { pathname } = url;
    const normalizePathname = normalize(pathname);
    const rootRoute = join('/');

    switch (normalizePathname) {
        case rootRoute:
            res.setHeader('content-type', 'text/html');
            readStream(ROOT_HTML_PATH, res);
            break;
        case FRONT_SCRIPT_PATH:
            res.setHeader('content-type', 'text/javascript');
            readStream(FULL_SCRIPT_PATH, res)
            break;
        case SUBSCRIBE_URL:
            chat.subscribe(req, res);
            break;
        case PUBLISH_URL:
            let body = "";
            req.on("data", chunk => {
                body += chunk;
                if (body.length > 1e4) {
                    res.statusCode = 413;
                    res.end("Your message is too big for my little chat");
                }
            });
            req.on("end", () => {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    res.statusCode = 400;
                    res.end("Bad Request");
                    return;
                }
                chat.publish(body.message);
                res.end();
            });
            break;
        default:
            res.statusCode = 404;
            res.end("Not found");
            break;
    };

    function readStream(fileName, res) {
        const fileStream = createReadStream(fileName);
        fileStream
            .on('error', function () {
                res.statusCode = 500;
                res.end("Server error");
            })
            .pipe(res)
            .on('close', function () {
                fileStream.destroy();
            });
    }
});

server.listen(PORT, HOST, () => {
    const adress = server.address();
    console.log(`Server is listening on port ${adress.port}`);
});

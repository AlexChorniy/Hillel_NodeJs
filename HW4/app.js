const http = require('http');
const qs = require("querystring");

const { join, normalize } = require('path');
const { createReadStream } = require('fs');
const fileType = require('file-type');

const chat = require('./assets/chat');
const { logResponse } = require('./LOGS/log');

const PORT = 8080;
const HOST = '127.0.0.1';
const FRONT_PATH = join(__dirname, 'front');
const ROOT_HTML_PATH = join(FRONT_PATH, 'index.html');
const FRONT_SCRIPT_PATH = join('\\', 'main.js');
const FULL_SCRIPT_PATH = join(FRONT_PATH, FRONT_SCRIPT_PATH);
const CREATE_ELEMENT_PATH = join('\\', 'createElement.js');
const ELEMENTS_PATH = join('\\', 'elements.js');

const PUBLISH_URL = join('\\', 'messages');
const SUBSCRIBE_URL = join('\\', 'messages');
const UPDATE_URL = join('\\', 'update');
const DELETE_URL = join('\\', 'delete');

const allowed_content_types = [
    "application/x-www-form-urlencoded",
    "application/json"
];

const server = http.createServer((req, res) => {
    const { method, headers } = req;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const { pathname } = url;
    const start_time = Date.now();
    let finished = false;

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
        case ELEMENTS_PATH:
            res.setHeader('content-type', 'text/javascript');
            readStream(join(FRONT_PATH, ELEMENTS_PATH), res);
            break;
        case CREATE_ELEMENT_PATH:
            res.setHeader('content-type', 'text/javascript');
            readStream(join(FRONT_PATH, CREATE_ELEMENT_PATH), res);
            break;
        case method === "GET" && SUBSCRIBE_URL:
            chat.subscribe(req, res);
            break;
        case method === "POST" && PUBLISH_URL:
            getData(req, res, 'chat');
            break;
        case UPDATE_URL:
            getData(req, res, 'update');
            break;
        case DELETE_URL:
            getData(req, res, 'delete');
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

    function getData(req, res, sendTo) {
        const contentType = req.headers["content-type"];

        if (!allowed_content_types.includes(contentType)) {
            res.statusCode = 400;
            res.end("not allowed content type");
            return;
        }

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

                if (contentType === "application/json") {
                    body = JSON.parse(body);
                } else if (contentType === "application/x-www-form-urlencoded") {
                    body = qs.parse(body);
                }

            } catch (e) {
                res.statusCode = 400;
                res.end("Bad Request");
                return;
            }

            const send = {
                chat: () => chat.publish(body),
                update: () => chat.update(res, req, body),
                delete: () => chat.delete(res, req, body),
            };
            send[sendTo]();

            res.end();
        });
    };

    const finish_listener = () => {
        finished = true;
        const end_time = Date.now();
        logResponse(
            start_time,
            end_time,
            res.statusCode,
            headers["user-agent"],
            url.href
        );
    };

    res.once('finish', finish_listener);
    res.once('close', () => {
        res.removeListener("finish", finish_listener);
        if (!finished) finish_listener();
    });

});

server.listen(PORT, HOST, () => {
    const adress = server.address();
    console.log(`Server is listening on port ${adress.port}`);
});

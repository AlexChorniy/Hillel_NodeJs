const express = require('express');
const { join } = require('path');
require("dotenv").config();
const server = express();
const messageModule = require('./messages');
const { logResponse } = require('./logs/logs.controller');


server.locals.messages = [];

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use((req, res, next) => {
    const { headers } = req;
    console.log('%s', req.url, Date.now());
    let finished = false;
    const start_time = Date.now();
    const url = new URL(req.url, `http://${req.headers.host}`);

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

    next();
});

server.use(express.static(join(__dirname, 'front')));
server.use(messageModule);

server.use(function (err, req, res, next) {
    console.log('app.js Error', err);
    res.status(err.code || 400).send("Something broke");
    // res.status(400).send({ message: err.message || err });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, "localhost", () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = server;

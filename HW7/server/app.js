const express = require('express');
const app = express();
const messageModule = require('./messages');
const { testData } = require('./messages/testData')
const { logResponse } = require('./logs/logs.controller');

const { join } = require('path');
require("dotenv").config();
const nunjucks = require('nunjucks');

const PORT = process.env.PORT || 8080;
const VIEW_DIR = join(__dirname, '..', 'client', 'view');
const ASSETS_DIR = join("client", "assets");

app.use((req, res, next) => {
    const { headers } = req;
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

nunjucks.configure(VIEW_DIR, {
    autoescape: false,
    express: app,
    watch: true
});

app.locals.messages = testData || [];

app.use('/public', express.static(ASSETS_DIR));
app.use('/', messageModule);

app.use(function (err, req, res, next) {
    console.log('app.js Error', err);
    res.status(err.code || 400).send("Something broke");
    // res.status(400).send({ message: err.message || err });
});

app.listen(PORT, "localhost", () => {
    console.log(`Server started on port ${PORT}`);
});
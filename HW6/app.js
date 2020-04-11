const express = require('express');
const { join } = require('path');
require("dotenv").config();
const server = express();
const messageModule = require('./messages');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.locals.messages = [];


server.use(messageModule);

server.use(function (err, req, res, next) {
    console.log('server.use', err);
    res.status(err.code || 400).send("Something broke");
    // res.status(400).send({ message: err.message || err });
});


const PORT = process.env.PORT || 8080;

server.listen(PORT, "localhost", () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = server;

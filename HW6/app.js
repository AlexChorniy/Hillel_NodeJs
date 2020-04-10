const express = require('express');
require("dotenv").config();
const server = express();

server.get("/", (req, res) => {
    res.end(
        "<>Hello world</>"
    );
});

console.log(process.env.PORT);

const PORT = process.env.PORT || 8080;

server.listen(PORT, "localhost", () => {
    console.log(`Server started on port ${PORT}`);
});

// require('dotenv').config();
const path = require('path'), fs = require('fs');
// const path = require('path');
// // process.env
// console.log("EXT", __dirname);
// // console.log("ARG", process.argv);

const dir = 'node_modules';
const filter = 'index.d.ts';
let files = fs.readdirSync(dir);

console.log('files', __dirname);

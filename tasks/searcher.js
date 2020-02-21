require('dotenv').config();
const path = require('path'), { readdirSync } = require('fs');
// console.log("EXT", process.env);
// console.log("ARG", process.argv);
const dirsPath = path.dirname(__dirname);
const normalizedPath = path.normalize(dirsPath);
const dirArr = normalizedPath.split(path.sep);
const files = readdirSync(__dirname);
dirArr.pop();
dirArr.join('\\');
console.log('Test', dirArr);

// for (const element of dirArr) {

//     // const folder = fs.readdir(folder);
//     
// }
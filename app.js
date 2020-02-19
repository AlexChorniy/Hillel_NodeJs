require('dotenv').config();
const { triangleArea, rectangleArea } = require("./tasks/areas");
const { fibonacci } = require("./tasks/fibonacci");
require("./tasks/hypotenuse");
const extToArray = JSON.parse(process.env.ARR);
//console.log("ARR", extToArray);

const result = `${triangleArea(extToArray[0], extToArray[1])} ${rectangleArea(extToArray[2], extToArray[3])} ${fibonacci(extToArray[4])}`;
console.log(result);
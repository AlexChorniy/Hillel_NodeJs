require('dotenv').config();
const { triangleArea, rectangleArea } = require("./tasks/areas");
const { fibonacci } = require("./tasks/fibonacci");
require("./tasks/hypotenuse");

console.log("EXT", process.env.EXT);
console.log("AGV", process.argv);

const result = `${triangleArea(3, 2)} ${rectangleArea(4, 5)} ${fibonacci(10)}`;
console.log(result);
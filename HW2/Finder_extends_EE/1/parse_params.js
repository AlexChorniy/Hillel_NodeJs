const { homedir } = require("os");
const { env, argv, platform } = process;
const ARG = require("minimist")(argv.slice(2));

let HOME = homedir();
if (platform === "win32") {
  HOME = HOME.replace(/\\/g, "\\\\");
}

const default_colors = JSON.stringify(["red", "green", "blue"]);

exports.EXT = JSON.parse(env.EXT || "[]");
exports.colors = JSON.parse(ARG.colors || default_colors);
exports.start_path = ARG.path || HOME;
exports.deep = parseInt(ARG.deep || "0");
exports.search = ARG.search || "";

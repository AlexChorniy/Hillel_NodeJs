const { promises } = require("fs");
const { join, relative } = require("path");
const Searcher = require("./Searcher");

function startParse(maxDeep, fileName, path, colors, ext, emitter) {
  const entryPoint = path;
  return async function finder(path = entryPoint, deep = 0) {
    const items = await promises.readdir(path, { withFileTypes: true });
    let files = [];
    let dirs = [];
    for (const item of items) {
      if (item.isFile()) {
        emitter("found:file");
        if (Searcher(item.name, path, emitter)) {
          // console.log('true', item.name);
          const relativePath = relative(entryPoint, join(path, item.name));
          files = [...files, relativePath];
        }
      } else if (item.isDirectory()) {
        emitter("found:dir");
        if (!maxDeep || deep < maxDeep) {
          dirs = [...dirs, item.name];
          const newPath = join(path, item.name);
          files = [...files, ...(await finder(newPath, deep + 1))];
        }
      }
    }
    return files;
  };
}

module.exports = startParse;

const { promises } = require("fs");
// const { promisify, promisifyAll } = require("bluebird");
// const { promisify } = require("util");
const { join, relative, extname } = require("path");

// const readdir = (path, options) => {
//   return new Promise((resolve, reject) => {
//     fs.readdir(path, options, (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(result);
//     });
//   });
// };

const start_parse = (entry_point, max_deep, ext, search, emitter) => {
  return async function finder(path_name = entry_point, deep = 0) {
    const files = [];
    const items = await promises.readdir(path_name, { withFileTypes: true });
    let i = 0;
    for (const item of items) {
      i++;
      if (i === 2) {
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
      if (item.isFile()) {
        emitter("found:file");
        if (
          ext.includes(extname(item.name)) &&
          (!search || (search && item.name.includes(search)))
        ) {
          const relative_path = relative(
            entry_point,
            join(path_name, item.name)
          );
          files.push(relative_path);
          emitter("file", relative_path);
        }
      } else if (item.isDirectory()) {
        emitter("found:dir");
        if (deep < max_deep || max_deep !== 0) {
          const new_path = join(path_name, item.name);
          files.push(...(await finder(new_path, deep + 1)));
        }
      }
    }

    return files;
  };
};

module.exports = start_parse;

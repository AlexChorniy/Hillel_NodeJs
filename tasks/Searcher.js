const { join, relative } = require("path");
const { createReadStream } = require("fs");
const FileType = require("file-type");
const readChunk = require("read-chunk");
const { extname } = require("path");
const { fullName } = require("../assets/parseParams");

function Searcher(itemName, path) {
  const name = fullName.name;
  const ext = fullName.ext;
  const reg = new RegExp(
    `^${name === "*" ? "." : name}${
      name.includes(" ? ") ? "?" : ""
    }\\w*\\W*${ext}$`,
    "ig"
  );
  const isMatch = !!itemName.match(reg);
  if (isMatch) {
    const fullPath = join(path, itemName);
    const fileExt = extname(itemName);
    if (fileExt === ".js" || fileExt === ".json") {
      // const stream = createReadStream(fullPath);
      // console.log("js", stream);
      return true;
    } else {
      (async () => {
        try {
          const stream = createReadStream(fullPath, {
            highWaterMark: 4100,
            start: 20,
            end: 20
          });
          const fromStream = await FileType.fromStream(stream);
          console.log("FileType", fromStream, fileExt, itemName);
        } catch (error) {
          console.log("error", error);
        }
      })();
      return true;
    }
  }
  return false;
}

module.exports = Searcher;

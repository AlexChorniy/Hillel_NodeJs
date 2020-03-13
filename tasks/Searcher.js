const { join } = require("path");
const { createReadStream } = require("fs");
const { fromStream } = require("file-type");
const { extname } = require("path");
const { fullName, search } = require("../assets/parseParams");

function Searcher(itemName, path, emitter) {
    const name = fullName.name;
    const ext = fullName.ext;
    const reg = new RegExp(
        `^${name === "*" ? "." : name}${name.includes(" ? ") ? "?" : ""}\\w*\\W*${ext}$`,
        "ig"
    );
    const isMatch = !!itemName.match(reg);

    if (isMatch) {
        const fullPath = join(path, itemName);
        const fileExt = extname(itemName);
        extArr = [".js", ".json", ".txt", ".mjs"];
        if (extArr.includes(fileExt)) {
            const stream = createReadStream(fullPath, { encoding: 'utf-8', start: 0, end: 4100 });
            (async () => {
                for await (const chunk of stream) {
                    if (chunk.includes(search)) {
                        const searchInd = chunk.indexOf(search);
                        const minInd = searchInd - 20;
                        const maxInd = +searchInd + search.length + 20;
                        const fromInd = minInd > 0 ? minInd : 0;
                        const toInd = maxInd > chunk.length ? chunk.length : maxInd;
                        const message = chunk.slice(fromInd, toInd);
                        emitter("write:log", message);
                    }
                }
            })();

            return true;
        } else {
            (async () => {
                try {
                    const stream = createReadStream(fullPath);
                    const fromReadStream = await fromStream(stream);
                    const isExtValid = fileExt === `.${fromReadStream.ext}`;
                    emitter("search:valid", itemName, isExtValid);
                } catch (error) {
                    console.log("error", error);
                }
            })();
            return true;
        }
    }
    return false;
}
// ws.end();
module.exports = Searcher;

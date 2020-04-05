const { readdir } = require("fs");

module.exports = (ee, l) => {
  readdir(__dirname, (err, files) => {
    if (err) {
      ee.emit("error", err);
      return;
    }

    ee.emit("files:receive", files);
    console.log("after emit");
    ee.removeListener("files:receive", l);
    ee.emit("files:receive", files);
    console.log("after");
  });
};

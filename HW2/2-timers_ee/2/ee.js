const EventEmitter = require("events");
const ee = new EventEmitter();
const l = data => {
  console.log("files 1", data);
};

require("./sub.js")(ee, l);

ee.on("files:receive", l);

ee.once("files:receive", data => {
  console.log("files 2", data);
});

ee.prependOnceListener("files:receive", data => {
  console.log("files 3", data);
});

ee.on("error", err => {
  console.error(err);
});


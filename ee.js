const EventEmitter = require("events");
const ee = new EventEmitter();

ee.on("error", err => {
    console.error(err);
});
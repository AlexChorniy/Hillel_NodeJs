const EventEmitter = require("events");
const { readdir } = require("fs");

class EE extends EventEmitter {
  constructor(dirname) {
    super();
    this._dirname = dirname;

    this.openDir();

    this.on("data", d => {
      console.log("receive data", d);
    });

    setTimeout(() => {
      this.emit("init");
    }, 0);
  }
  openDir() {
    readdir(this._dirname, (err, data) => {
      if (!err) {
        this.emit("files", data);
      }
    });
  }
}

const c = new EE(__dirname);

c.on("init", () => {
  c.emit("data", 1);
});
c.on("files", data => {
  console.log("receive files", data);
});

// class Rectangle {
//     constructor(height, width) {
//         this.height = height;
//         this.width = width;
//     }

//     get area() {
//         return this.calcArea();
//     }

//     calcArea() {
//         return this.height * this.width;
//     }
// }

// const square = new Rectangle(10, 10);

// console.log(square.area);
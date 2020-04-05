const EventEmitter = require("events");
const { createWriteStream } = require("fs");
const finder = require("./tasks/Finder");

const unix = Date.now();
const ws = createWriteStream(`./LOGS/${unix}.log`);
const INTERVAL = 2000;

class Finder extends EventEmitter {
    constructor(deep, fileName, path, colors, ext) {
        super();
        this._deep = deep;
        this._fileName = fileName;
        this._path = path;
        this._colors = colors;
        this._ext = ext;
        this.timer;
        this._processFiles = 0;
        this._processDirs = 0;
        this.on('found:file', () => {
            this.found('Files')
        });
        this.on('found:dir', this.found.bind(this, 'Dirs'));
        this.on('file', this.setTimer);
        setTimeout(() => {
            this.emit('started');
        }
        );
        this.on('parse', this.parseDir);
        this.on('search:valid', (itemName, isExtValid) => {
            const message = `File name -${itemName} Is validation passed-${isExtValid} \n`;
            ws.write(message);
        });
        this.on('write:log', message => {
            ws.write(message);
            // ws.end();
        });
    }
    async parseDir() {
        console.log('started');
        this.setTimer();
        await finder(this._deep, this._fileName, this._path, this._colors, this._ext, this.emit.bind(this))();
        this.emit('finished');
    }
    found(name) {
        this[`_process${name}`]++;
    }
    setTimer() {
        this.timer = setTimeout(() => {
            this.emit('processing', { dirs: this._processDirs, files: this._processFiles })
            this.setTimer();
            this.clearTimer();
        }, INTERVAL);
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
}

module.exports = Finder;

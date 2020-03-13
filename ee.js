const EventEmitter = require("events");
const finder = require("./tasks/Finder");

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
        this.on('search:valid', (itemName, isExtValid) => console.log("File name-", itemName, " is file valid-", isExtValid));
        this.on('write:log', message => {
            console.log('write:log', message);
        });
    }
    async parseDir() {
        console.log('started');
        this.setTimer();
        const consilience = await finder(this._deep, this._fileName, this._path, this._colors, this._ext, this.emit.bind(this))();
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

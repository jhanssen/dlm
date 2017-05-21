/*global require,module*/
const Store = require("jfs");
const db = new Store("dlmstore");
const EventEmitter = require("events");

class HttpDownloads extends EventEmitter
{
    constructor() {
        super();

        this._datas = [];
    }

    init() {
        return new Promise((resolve, reject) => {
            db.get("http", (err, obj) => {
                if (err) {
                    this._datas = [];
                    resolve();
                    return;
                }
                this._datas = obj;
                this._recreate();
                resolve();
            });
        });
    }

    deinit() {
        db.saveSync("http", this._datas);
    }

    list(ws) {
        // fake some data for now
        ws.send(JSON.stringify({ type: "http-downloads", data: this._datas }));
    }

    add(ws, data) {
    }

    _recreate() {
    }
}

module.exports = HttpDownloads;

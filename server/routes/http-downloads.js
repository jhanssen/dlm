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
        //ws.send(JSON.stringify({ type: "http-downloads", data: this._datas }));
        ws.send(JSON.stringify({ type: "http-downloads", data: [{ url: "http://www.google.com/", status: "downloading"}] }));
    }

    add(ws, data) {
    }

    progress(ws, data) {
        //console.log("asked for progress for", data);
        // fake some more
        ws.send(JSON.stringify({ type: "http-progress", data: { url: "http://www.google.com/", current: 100, length: 1000, status: "downloading" }}));
    }

    _recreate() {
    }
}

module.exports = HttpDownloads;

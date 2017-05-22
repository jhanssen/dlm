/*global require,module*/
const Store = require("jfs");
const db = new Store("dlmstore");
const EventEmitter = require("events");
const mtdl = require("mt-download");

function stateToString(s)
{
    switch (s) {
    case mtdl.State.Stopping:
    case mtdl.State.Stopped:
        return "stopped";
    case mtdl.State.Starting:
    case mtdl.State.Started:
        return "downloading";
    case mtdl.State.Finished:
        return "finished";
    case mtdl.State.Error:
        return "error";
    }
    return undefined;
}

class HttpDownload extends EventEmitter
{
    constructor(data)
    {
        super();

        if (!("url" in data))
            throw new Error("Need an url");
        this.url = data.url;
        if ("headers" in data)
            this.headers = data.headers;
        if ("username" in data)
            this.username = data.username;
        if ("password" in data)
            this.password = data.password;
        if ("filename" in data)
            this.filename = data.filename;
        else
            this.filename = "";

        this.ctrl = undefined;
        this.current = undefined;
        this.length = undefined;
        this.state = undefined;
    }

    start() {
        if (this.ctrl)
            return;
        console.log("uhm, go?");
        mtdl.prepare({ url: this.url, path: ".", threads: 8 })
            .then(ctrl => {
                this.ctrl = ctrl;
                this.filename = ctrl.path;
                this.ctrl.on("progress", (perc, current, length) => {
                    this.current = current;
                    this.length = length;
                    this.emit("progress", this.url, current, length);
                    console.log("perc", perc);
                });
                this.ctrl.on("state", state => {
                    this.state = state;
                    this.emit("state", this.url, state);
                });
                this.ctrl.start();
            }).catch(err => {
                console.log(err);
            });
    }

    serialize(save) {
        return {
            url: this.url,
            headers: this.headers,
            username: this.username,
            password: this.password,
            state: save ? this.state : stateToString(this.state),
            filename: save ? this.filename : undefined
        };
    }
}

class HttpDownloads extends EventEmitter
{
    constructor() {
        super();

        this._datas = [];
    }

    init() {
        return new Promise((resolve, reject) => {
            db.get("http", (err, obj) => {
                this._datas = [];
                if (err || (!(obj instanceof Array))) {
                    resolve();
                    return;
                }
                //this._datas = obj;
                try {
                    for (let idx = 0; idx < obj.length; ++idx) {
                        this._datas.push(new HttpDownload(obj[idx]));
                    }
                } catch (e) {
                }
                this._recreate();
                resolve();
            });
        });
    }

    deinit() {
        let ser = this._datas.map(elem => {
            return elem.serialize(true);
        });
        db.saveSync("http", ser);
    }

    list(ws) {
        // fake some data for now
        let ser = this._datas.map(elem => {
            return elem.serialize();
        });

        ws.send(JSON.stringify({ type: "http-downloads", data: ser }));
        //ws.send(JSON.stringify({ type: "http-downloads", data: [{ url: "http://www.google.com/", state: "downloading"}] }));
    }

    add(ws, data) {
        console.log("add", data);

        try {
            let dl = new HttpDownload(data.download);

            for (let idx = 0; idx < this._datas.length; ++idx) {
                if (this._datas[idx].url == dl.url) {
                    // bah
                    throw new Error(`URL ${dl.url} already exists`);
                }
            }

            this._datas.push(dl);

            this.list(ws);

            console.log("starting...");
            dl.start();
            dl.on("progress", (url, current, length) => {
                this.emit("data", JSON.stringify({ type: "http-progress", data: { url: url, current: current, length: length } }));
            });
            dl.on("state", (url, state) => {
                this.emit("data", JSON.stringify({ type: "http-progress", data: { url: url, state: stateToString(state) } }));
            });
        } catch (e) {
            console.log(e);
            ws.send(JSON.stringify({ type: "error", msg: e.message }));
        }
    }

    progress(ws, data) {
        //console.log("asked for progress for", data);
        // find the thing
        for (let idx = 0; idx < this._datas.length; ++idx) {
            if (this._datas[idx].url == data.url) {
                let d = this._datas[idx];
                // ok
                ws.send(JSON.stringify({ type: "http-progress", data: { url: d.url, current: d.current, length: d.length, state: stateToString(d.state) }}));
                return;
            }
        }
        // fake some more
    }

    _recreate() {
    }
}

module.exports = HttpDownloads;

/*global require,module*/
const Store = require("jfs");
const db = new Store("dlm");

module.exports = {
    _datas: undefined,

    init: function() {
        return new Promise((resolve, reject) => {
            db.get("http", (err, obj) => {
                if (err) {
                    this._datas = {};
                    resolve();
                    return;
                }
                this._datas = obj;
                resolve();
            });
        });
    },
    deinit: function() {
        db.saveSync("http", this._datas);
    },

    handle: function(ws) {
        // fake some data for now
        ws.send(JSON.stringify({ type: "http-downloads", data: this._datas }));
    }
};

/*global require,module,process*/

const express = require('express');
const nodeCleanup = require('node-cleanup');
const router = express.Router();
const HttpDownloads = require('./http-downloads');
const httpDownloads = new HttpDownloads;

nodeCleanup(function() {
    httpDownloads.deinit();
});

const data = {
    clients: [],
    handlers: {
        "http-downloads": function(ws, obj) {
            httpDownloads.list(ws);
        },
        "http-download-add": function(ws, obj) {
            httpDownloads.add(ws, obj);
        },
        "http-progress": function(ws, obj) {
            httpDownloads.progress(ws, obj);
        }
    }
};

httpDownloads.init().then(() => {
    for (let idx in data.clients) {
        let client = data.clients[idx];
        httpDownloads.list(client);
    }
});

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

router.ws('/ws', (ws, req) => {
    data.clients.push(ws);
    ws.on("message", msg => {
        try {
            let obj = JSON.parse(msg);
            if ("type" in obj && obj.type in data.handlers) {
                data.handlers[obj.type](ws, obj);
            } else {
                console.error(`no handler for ${obj.type}`);
            }
        } catch (e) {
            console.error("invalid client message", msg);
        }
    });
    // ws.send(JSON.stringify({ "yay": "yay" }));
});

module.exports = router;

/*global require,module*/

const express = require('express');
const router = express.Router();

const data = {
    clients: [],
    handlers: {
        "http-downloads": function(ws, obj) {
            // fake some data for now
            ws.send(JSON.stringify({ type: "http-downloads", data: "yay" }));
        }
    }
};

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
            }
        } catch (e) {
            console.error("invalid client message", msg);
        }
    });
    // ws.send(JSON.stringify({ "yay": "yay" }));
});

module.exports = router;

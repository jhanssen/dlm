/*global require,module*/

const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

router.ws('/ws', (ws, req) => {
    ws.send(JSON.stringify({ "yay": "yay" }));
});

module.exports = router;

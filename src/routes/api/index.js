// src/routes/api/index.js

var router = require('express').Router();

router.get('/location/:location', function(req, res) {
    console.log('[HIT] location: ' + req.params.location);
    res.send(200, 'Got location: ' + req.params.location);
});

module.exports = router;
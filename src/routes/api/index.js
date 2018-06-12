// src/routes/api/index.js

var router = require('express').Router();
var path = require('path');
var redisconn = require('../../utils/redisconn.js');
var redis = require('redis');

router.get('/location/:location', function (req, res) {
    var location = { location: req.params.location };
    res.status(200).json(location);
});

router.post('/location/:cityName', function (req, res) {
    console.log(__dirname, '../../utils/dbconn.js');
    redisconn.fetch(req.params.cityName, '', '');
    res.status(200).json(location);
});
module.exports = router;
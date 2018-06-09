// src/routes/api/index.js

var router = require('express').Router();
var path = require('path');
var redisconn = require('../../utils/dbconn.js');
var redis = require('redis');

router.get('/location', function (req, res) {
    var location = { 
        city: req.query.city, 
        state: req.query.state,
        country: req.query.country  
    };
    res.status(200).json(location);
});

router.post('/location/:cityName', function (req, res) {
    console.log(__dirname, '../../utils/dbconn.js');
    var location = { location: req.params.cityName, host: redisconn.config.host, port: redisconn.config.port };
    var client = redis.createClient(redisconn.config.port, redisconn.config.host);
    client.auth(redisconn.config.password, function (err) {
        if (err) {
            throw err;
        }
    });
    client.on('connect', function () {
        console.log('Connected to redis!');
    });
    res.status(200).json(location);
});
module.exports = router;
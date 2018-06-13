// src/routes/api/index.js

var router = require('express').Router();
var path = require('path');
var redisconn = require('../../utils/redisconn.js');
var zomato = require('../../services/zomato_service.js');

router.get('/location', function (req, res) {
    var location = { 
        city: req.query.city, 
        state: req.query.state,
        country: req.query.country  
    };
    zomato.fetch(location.city, location.state, location.country);
    res.status(200).json(location);
});

router.post('/location/:cityName', function (req, res) {
    console.log(__dirname, '../../utils/dbconn.js');
    redisconn.fetch(req.params.cityName, '', '');
    res.status(200).json(location);
});
module.exports = router;
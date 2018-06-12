// src/utils/redisconn.js

var redis = require('redis');
var redisconfig = require('./dbconn.js');

function redisconn() {
    this.client = redis.createClient(redisconfig.config.port, redisconfig.config.host);
    this.client.auth(redisconfig.config.password, function (err) {
        if (err) {
            throw err;
        }
    });
    this.client.on('connect', function () {
        console.log('Connected to redis!');
    });
}

redisconn.prototype.fetch = function(city, state, country) {
    console.log('fething for ' + JSON.stringify(city));
    this.client.get(JSON.stringify(city), function(error, reply) {
        console.error('error: ' + error);
        console.log('reply: ' + reply);
    });
};

var rconn = new redisconn();
module.exports = rconn;
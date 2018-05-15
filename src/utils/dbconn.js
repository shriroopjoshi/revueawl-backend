// src/utils/dbconn.js

var fs = require('fs');
var path = require('path');

var configPath = path.join(__dirname, '../../config/redis_conn.json');
var config = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

console.log(config);

module.exports.config = config;
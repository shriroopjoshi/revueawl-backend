// src/services/zomato_service

var fs = require('fs');
var path = require('path');

function zomatoService() {
    var zconfigPath = path.join(__dirname, '../../config/zomato.json');
    var zconfig = JSON.parse(fs.readFileSync(zconfigPath, 'UTF-8'));
    this.key = zconfig.key;
    this.baseUrl = zconfig.baseUrl;
}

zomatoService.prototype.fetch = function(city, state, country) {
    // use end-point /cities to fetch all cities with name == city
    // iterate through them to get state and country right - if no match -> return empty list
    // get ID for correct city
    // use end-point /collections with city-ID to fetch all restaurants
    // use /reviews to get rating
}

var zs = new zomatoService();
module.exports = zs;



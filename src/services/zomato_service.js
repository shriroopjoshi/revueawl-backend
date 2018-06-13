// src/services/zomato_service

var fs = require('fs');
var path = require('path');
var request = require('request');

function zomatoService() {
    var zconfigPath = path.join(__dirname, '../../config/zomato.json');
    var zconfig = JSON.parse(fs.readFileSync(zconfigPath, 'UTF-8'));
    this.key = zconfig.key;
    this.url = zconfig.host;
}

function getRequest(urlPacket) {
    return new Promise(function(success, failure) {
        request(urlPacket, function(error, response, body) {
            if(!error && response.statusCode == 200) {
                success(body);
            } else {
                failure(error);
            }
        });
    });
}

zomatoService.prototype.fetch = function (city, state, country) {
    // use end-point /cities to fetch all cities with name == city
    // iterate through them to get state and country right - if no match -> return empty list
    // get ID for correct city
    // use end-point /collections with city-ID to fetch all restaurants
    // use /reviews to get rating
    var inputCity = city + ", " + state;
    inputCity = inputCity.toLowerCase();
    var baseUrl = this.url;
    var key = this.key;
    var options = {
        url: baseUrl + '/cities?q=' + JSON.stringify(city),
        headers: {
            'user-key': key
        }
    }
    getRequest(options).then(function (body) {
        var location = null;
        var sugg = JSON.parse(body);
        for(var i = 0; i < sugg.location_suggestions.length; ++i) {
            console.log(sugg.location_suggestions[i].name);
            if(sugg.location_suggestions[i].name.toLowerCase() === inputCity) {
                location = sugg.location_suggestions[i];
                console.log(location);
            }
            if(location == null) {
                throw new Error('No such city found');
            }
        }
        options = {
            url: baseUrl + '/collections?city_id=' + location.id,
            headers: {
                'user-key': key
            }
        }
        console.log(JSON.stringify(options));
        return getRequest(options);
    }).then(function (body){
        console.log(body);
    }).catch(function (error) {
        console.error(error);
    });
}

var zs = new zomatoService();
module.exports = zs;



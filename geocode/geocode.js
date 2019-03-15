const request = require('request');


var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    const cityId = '2643743' //london uk
    const apikey = '6173fe8be74fcb4e4cb80fd8d5369ed2';
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${encodedAddress}&appid=${apikey}`;


    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect')
        } 
        else if(body.cod === '404'){
            callback('Unable to find Address');
        } 
        else if(body.cod='200'){
            callback(undefined, {
                city: body.city.name,
                country: body.city.country,
                lon: body.city.coord.lon,
                lat: body.city.coord.lat,

            })
            
        }
    })


 }

module.exports.geocodeAddress = geocodeAddress;


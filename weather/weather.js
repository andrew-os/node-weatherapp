const request = require('request');

var getWeather = (lat, lon, callback) => {
    const apikey = '6173fe8be74fcb4e4cb80fd8d5369ed2';
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
    
    request({
        url: url,
        json: true,
    
    }, (error, response, body) => {
     if(error){
         callback('Unable to connect to server');
     }
     if(response.statusCode === 400){
         callback('Unable to fetch weather');
     }
     if(response.statusCode === 200) {
         callback(undefined, {
            temperature: body.list[0].main.temp,
         });
     }
    })
}

module.exports.getWeather = getWeather;
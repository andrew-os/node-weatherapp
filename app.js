const yargs = require('yargs');

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather');
const argv = yargs
    .options({
        a:{
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    } else {
        //console.log();
        weather.getWeather(results.lat, results.lon, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            } else {
                console.log(`Its currently ${weatherResults.temperature} degrees in ${results.city}.`);
            }
        });
    }
});    

//lat, long arguement, callback function as above
//


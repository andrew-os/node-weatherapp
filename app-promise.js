const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
const apikey = '6173fe8be74fcb4e4cb80fd8d5369ed2';
const url = `http://api.openweathermap.org/data/2.5/forecast?q=${encodedAddress}&appid=${apikey}`;

axios.get(url).then((response) => {
    if (response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that place')
    }

    var lat = response.data.city.coord.lat;
    var lon = response.data.city.coord.lat;
    var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;

    return axios.get(weatherUrl)
}).then((response) =>{
    var temperature = response.data.list[0].main.temp;
    console.log (` The temperature is ${temperature}`);
}).catch((e) => {
    //console.log(e.response.status);
    if(e.response.status === 404){
        console.log(e.response.data.message);
    } else {
        console.log(e.message);
    }
})

//Async Intro

// console.log('Starting');


// setTimeout(() => {
//     console.log('2 second timer');
// }, 2000)

// setTimeout(() => {
//     console.log('0 second timer');
// }, 0)

// console.log('Stopping');

//2a18053b061558ebea97678f98cbcf89

//Weather App

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address');
} else {
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return console.log('Error', error);
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log('Error', error);
            }
            console.log(location);
            console.log(forecastData)
          })
    })
}
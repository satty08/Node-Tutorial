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

const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=2a18053b061558ebea97678f98cbcf89&query=37.8267,-122.4233&units=f'

request({ url: url, json: true }, (error, response) => {
    console.log(`It is ${response.body.current.weather_descriptions} outside. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out`);
    // console.log(response.body.current);
})

//Geocoding
//Address -> Lat/Long -> weather

const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2F0dHkwOCIsImEiOiJja2drZmtrb3owNnphMnRwY3lrNzJycW1sIn0.31csYSldq5wOosPHJF_6Pw&limit=1'
request({ url: url2, json: true}, (error, response) => {

    if (error) {
        console.log('Check your internet connection!');
    } else if(response.body.features.length === []) {
        console.log('Unable to find location');
    } else {
        console.log(`The latitude is ${response.body.features[0].center[1]} and longitude is ${response.body.features[0].center[0]}`);   
    }
})
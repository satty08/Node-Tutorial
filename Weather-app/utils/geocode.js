const request = require('request');

//Geocoding
//Address -> Lat/Long -> weather

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2F0dHkwOCIsImEiOiJja2drZmtrb3owNnphMnRwY3lrNzJycW1sIn0.31csYSldq5wOosPHJF_6Pw&limit=1`;

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode
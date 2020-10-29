const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2a18053b061558ebea97678f98cbcf89&query=${longitude},${latitude}&units=f`

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Check your internet connection!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        }else {
            callback(undefined, `It is ${body.current.weather_descriptions} outside. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`)
        }
    })
}

module.exports = forecast;
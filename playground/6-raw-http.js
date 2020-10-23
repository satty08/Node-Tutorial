const https = require('http');

const url = `http://api.weatherstack.com/current?access_key=2a18053b061558ebea97678f98cbcf89&query=45,-75&units=f`;

const request = https.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data = data + chunk.toString();
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body);
    })
})

request.on('error', (error) => {
    console.log('An error ', error);
})

request.end()
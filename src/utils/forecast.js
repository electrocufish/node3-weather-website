// const url = 'http://api.weatherstack.com/current?access_key=a82002b47d2093822f0eeedf4f7abc3c&query=37.8267,-122.4233&units=f'

// request({ url: url, json: true }, (error, response) => {
//     // const data = JSON.parse(response.body)
//     // console.log(response.body.current)

//     const res = response.body.current

//     console.log(res.weather_descriptions[0] + '. It is currently ' + res.temperature + ' degrees out. It feels like ' + res.feelslike + ' degrees out.')
// })

const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a82002b47d2093822f0eeedf4f7abc3c&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        } else if (body.success === 'false') {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            // const res = response.body.current
            // callback(undefined, res.weather_descriptions[0] + '. It is currently ' + res.temperature + ' degrees out. It feels like ' + res.feelslike + ' degrees out.')
            const {weather_descriptions, temperature, humidity, feelslike} = body.current
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out. The humidity is ' + humidity + '%.' )
        }
    })
}

module.exports = forecast
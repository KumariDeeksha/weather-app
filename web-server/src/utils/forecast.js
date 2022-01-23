const request = require("request")

const forecast = (latitude, longitude, callback) => {
    // const url = `http://api.weatherstack.com/current?access_key=3534a4f888605991fb027eab2dad71c7&query`+latitude+','+ longitude + '&units=f'
    const url = `http://api.weatherstack.com/current?access_key=3534a4f888605991fb027eab2dad71c7&query=${latitude},${longitude}&units=f`;

    request({ url: url, json: true }, (error, res) => {
        if (error) {
            callback('unable to connect to  weather service', undefined);
        } else if (res.body.error) {
            callback('unable to find location', undefined);
        } else {
            //        callback(undefined,response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.");
            const d = JSON.parse(res.body);
            const forecast = `Temperature of the place is ${d.current.temperature}`;
            callback(error, forecast);
        }
    }
)}

module.exports = forecast
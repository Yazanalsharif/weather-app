const request = require("request");


const forcast = (latitude, longtitude, callback) => {
    const latLon = latitude + "," + longtitude;
    const url = "http://api.weatherstack.com/current?access_key=8d0e01c27439ab5d4b4b511fef3f9e15&query="+ latLon +"&unit=m";
    request({url, json: true}, (error, response) => {
        if(error) {
            callback("can't reach to weatherstack service", undefined);
        }else if(response.body.error) {
            callback(response.body.error.info, undefined);
        }else {
            const data = {
                temperature: response.body.current.temperature,
                wind_speed: response.body.current.wind_speed,
                desc: response.body.current.weather_descriptions[0]
            }
            callback(undefined, data);
        }

    })

}

module.exports = forcast;
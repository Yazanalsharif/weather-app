const request = require("request");

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoieWF6YW5hbHNoYXJpZiIsImEiOiJja2Ztd2R1NzQwMjRtMnNwY2d5MmNyeG40In0.PJCcIl7ulOzQpx97gcEQDQ&limit=1";
    request({url, json:true}, (error, data) => {
        if(error) {
            callback("can't reach to mapbox service", undefined);
        }else if(data.body.message) {
            callback(data.body.message, undefined);
        }else if(data.body.features.length === 0) {
            callback("the address does't exist", undefined);
        }else{
            callback(undefined, {
                latitude: data.body.features[0].center[1],
                lontitude: data.body.features[0].center[0],
                place: data.body.features[0].text
            });
            
        }

    })
}

module.exports = geoCode;

const utils = require('./utils');
const constants = require('./constants');


exports.handler = async (request) => {
    const params = request.params;
    const type = request.body.type;
    try {
        if (params.city) {
            const city = params.city;
            return await utils.getWeatherByCity(constants.CURRENT_TYPE, city);
        }
        else
        {
            const publicIp = await utils.getIp();
            const ipApiResponse = await utils.ipApiData(publicIp);
            console.log(ipApiResponse);

            const lat =  ipApiResponse.lat;
            const lon =  ipApiResponse.lon;

            return await utils.getWeatherByCoordinates(lat, lon);
        }
    } catch(error) {
        console.log(error);
        return error;
    }
};
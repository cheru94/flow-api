const utils = require('./lib/utils');
const constants = require('./lib/constants');

exports.handler = async (request) => {
    try {
        const params = request.params;
        if (params.city) {
            const city = params.city;
            return await utils.getWeatherByCity(constants.CURRENT_TYPE, city);
        }
        else
        {
            const publicIp = await utils.getIp();
            const ipApiResponse = await utils.ipApiData(publicIp);
            const lat =  ipApiResponse.lat;
            const lon =  ipApiResponse.lon;
            return await utils.getWeatherByCoordinates(constants.CURRENT_TYPE, lat, lon);
        }
    } catch(error) {
        return error;
    }
};

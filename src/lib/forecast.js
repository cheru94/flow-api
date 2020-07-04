const utils = require('./utils');
const constants = require('./constants');

exports.handler = async (request) => {
    const params = request.params;
    try {
        if (params.city) {
            const city = params.city;
            return await utils.getWeatherByCity(constants.FORECAST_TYPE, city);
        }
        else
        {
            const publicIp = await utils.getIp();
            const ipApiResponse = await utils.ipApiData(publicIp);
            const lat =  ipApiResponse.lat;
            const lon =  ipApiResponse.lon;
            return await utils.getWeatherByCoordinates(constants.FORECAST_TYPE, lat, lon);
        }
    } catch(error) {
        return error;
    }
};

const utils = require('./lib/utils');
const constants = require('./lib/constants');

/**
 * @param {Object} request
 * @returns Returns the forecast weather from openWeatherAPI
 */
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

const myIp = require('public-ip');
const constants = require('./constants');
const executor = require('./r_executor');

let url;

const getIp = async() => {
    console.log(await myIp.v4());
    return  await myIp.v4();
};

/**
 * @param {String} publicIp The public ip of the client to be search for
 * @returns Returns the response in JSON format from ip-api
 */
const ipApiData = async (publicIp) => {
    let responseIpApi = await executor.getExecution(`${constants.IP_API_BASE_URL}${publicIp}`);
    return JSON.parse(responseIpApi);
};

/**
 * @param {String} type Type of search to be done
 * @param {string} cityName City name to be search for
 * @returns Returns the JSON response from openWeatherAPI
 */
const getWeatherByCity = async (type, cityName) => {
    switch (type) {
        case constants.CURRENT_TYPE:
            url = `${constants.OPEN_WEATHER_API_DAY}q=${cityName}&appid=${constants.OPEN_WEATHER_KEY}`;
        break;
        case constants.FORECAST_TYPE:
            url = `${constants.OPEN_WEATHER_API_FORECAST}q=${cityName}&appid=${constants.OPEN_WEATHER_KEY}`;
        break;
        default:
        break;
    }
    let responseWeather = await executor.getExecution(url);
    return JSON.parse(responseWeather);
};

/**
 * @param {String} type Type of search to be done
 * @param {*} lat Latitude
 * @param {*} lon Longitude
 * @returns Returns the JSON response from openWeatherAPI
 */
const getWeatherByCoordinates = async (type, lat, lon) => {
    switch (type) {
        case constants.CURRENT_TYPE:
            url = `${constants.OPEN_WEATHER_API_DAY}lat=${lat}&lon=${lon}&appid=${constants.OPEN_WEATHER_KEY}`;
        break;
        case constants.FORECAST_TYPE:
            url = `${constants.OPEN_WEATHER_API_FORECAST}lat=${lat}&lon=${lon}&appid=${constants.OPEN_WEATHER_KEY}`;
        break;
        default:
        break;
    }
    let responseWeather = await executor.getExecution(url);
    return JSON.parse(responseWeather);
};

exports.getIp = getIp;
exports.ipApiData = ipApiData;
exports.getWeatherByCoordinates = getWeatherByCoordinates;
exports.getWeatherByCity = getWeatherByCity;

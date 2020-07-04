const myIp = require('public-ip');
const constants = require('./constants');
const executor = require('./r_executor');

let url;

const getIp = async() => {
    return  await myIp.v4();
};

/**
 * 
 * @param {String} publicIp 
 */
const ipApiData = async (publicIp) => {
    const myIp = getIp();
    url = `http://ip-api.com/json/${publicIp}`;
    let responseIpApi = await executor.getExecution(url);
    return JSON.parse(responseIpApi);
};

/**
 * 
 * @param {String} type 
 * @param {string} cityName 
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
 * 
 * @param {*} lat 
 * @param {*} lon 
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

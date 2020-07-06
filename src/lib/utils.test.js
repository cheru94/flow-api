const sinon  = require('sinon'); 
const mocha = require ('mocha');
const chai = require('chai');
const expect = chai.expect;
const utils = require('./utils');
const locationStubs = require('./stubs/location_stubs');
const currentStubs = require('./stubs/current_stubs');
const forecastStubs = require('./stubs/forecast_stubs');
const constants = require('./constants');

describe('Utils Unit Test', () => {

    beforeEach(() => {
        stubGetIpResponse = '181.164.130.181';
        cityStubName = 'Los Angeles, US';
        latStub = -31.4015;
        lonStub = -64.1803;
        getIpStub = sinon.stub(utils, 'getIp');
        getLocationStub = sinon.stub(utils, 'ipApiData');
        getWeatherByCityStub = sinon.stub(utils, 'getWeatherByCity');
        getWeatherByCoordinatesStub = sinon.stub(utils, 'getWeatherByCoordinates');
    });

    afterEach(() => {
        getIpStub.restore();
        getLocationStub.restore();
        getWeatherByCityStub.restore();
        getWeatherByCoordinatesStub.restore();
    }); 

    it('Expect to recieve Public IP information', async () => {
       getIpStub.returns(stubGetIpResponse);
       const getIpResponse = await utils.getIp();
       expect(getIpResponse).not.to.be.null;
       expect(getIpResponse).to.be.a('String');
    });

    it('Expect to recieve Location information from an IP', async () => {
        getLocationStub.withArgs(stubGetIpResponse).returns(locationStubs.locationStub);
        const locationResponse = await utils.ipApiData(stubGetIpResponse);
        expect(locationResponse).to.be.a('Object');
        expect(locationResponse).to.have.property("status");
        expect(locationResponse).to.have.property("country");
        expect(locationResponse).to.have.property("countryCode");
        expect(locationResponse).to.have.property("region");
        expect(locationResponse).to.have.property("city");
        expect(locationResponse).to.have.property("zip");
        expect(locationResponse).to.have.property("lat");
        expect(locationResponse).to.have.property("lon");
        expect(locationResponse).to.have.property("timezone");
        expect(locationResponse).to.have.property("isp");
        expect(locationResponse).to.have.property("org");
        expect(locationResponse).to.have.property("as");
        expect(locationResponse).to.have.property("query");
        expect(locationResponse.status).to.eql("success");
    });

    it('Expect to recieve current weather information by cityName', async () => {
        getWeatherByCityStub.withArgs(constants.CURRENT_TYPE, cityStubName).returns(currentStubs.stubCurrentLaResponse);
        const getWeatherByCityResponse = await utils.getWeatherByCity(constants.CURRENT_TYPE, cityStubName);
        expect(getWeatherByCityResponse).to.be.a('Object');
        expect(getWeatherByCityResponse).to.have.property("coord");
        expect(getWeatherByCityResponse).to.have.property("weather");
        expect(getWeatherByCityResponse.weather).to.be.a('Array');
        expect(getWeatherByCityResponse).to.have.property("base");
        expect(getWeatherByCityResponse).to.have.property("main");
        expect(getWeatherByCityResponse).to.have.nested.property("main.temp");
        expect(getWeatherByCityResponse).to.have.nested.property("main.feels_like");
        expect(getWeatherByCityResponse).to.have.nested.property("main.temp_min");
        expect(getWeatherByCityResponse).to.have.nested.property("main.temp_max");
        expect(getWeatherByCityResponse).to.have.nested.property("main.pressure");
        expect(getWeatherByCityResponse).to.have.nested.property("main.humidity");
        expect(getWeatherByCityResponse).to.have.property("visibility");
        expect(getWeatherByCityResponse).to.have.property("wind");
        expect(getWeatherByCityResponse).to.have.nested.property("wind.speed");
        expect(getWeatherByCityResponse).to.have.nested.property("wind.deg");
        expect(getWeatherByCityResponse).to.have.property("clouds");
        expect(getWeatherByCityResponse).to.have.nested.property("clouds.all");
        expect(getWeatherByCityResponse).to.have.property("dt");
        expect(getWeatherByCityResponse).to.have.property("sys");
        expect(getWeatherByCityResponse).to.have.nested.property("sys.type");
        expect(getWeatherByCityResponse).to.have.nested.property("sys.id");
        expect(getWeatherByCityResponse).to.have.nested.property("sys.country");
        expect(getWeatherByCityResponse).to.have.nested.property("sys.sunrise");
        expect(getWeatherByCityResponse).to.have.nested.property("sys.sunset");
        expect(getWeatherByCityResponse).to.have.property("timezone");
        expect(getWeatherByCityResponse).to.have.property("id");
        expect(getWeatherByCityResponse).to.have.property("name");
        expect(getWeatherByCityResponse).to.have.property("cod");
        expect(getWeatherByCityResponse.cod).to.eql(200);
        expect(getWeatherByCityResponse.name).to.eql('Los Angeles');
    });

    it('Expect to recieve forecast weather information by cityName', async () => {
        getWeatherByCityStub.withArgs(constants.FORECAST_TYPE, cityStubName).returns(forecastStubs.la);
        const getWeatherByCityResponse = await utils.getWeatherByCity(constants.FORECAST_TYPE, cityStubName);
        expect(getWeatherByCityResponse).to.be.a('Object');
        expect(getWeatherByCityResponse).to.have.property("cod");
        expect(getWeatherByCityResponse).to.have.property("message");
        expect(getWeatherByCityResponse).to.have.property("cnt");
        expect(getWeatherByCityResponse).to.have.property("list");
        expect(getWeatherByCityResponse.list).to.be.a('Array');
        expect(getWeatherByCityResponse).to.have.property("city");
        expect(getWeatherByCityResponse).to.have.nested.property("city.id");
        expect(getWeatherByCityResponse).to.have.nested.property("city.name");
        expect(getWeatherByCityResponse).to.have.nested.property("city.coord");
        expect(getWeatherByCityResponse).to.have.nested.property("city.coord.lat");
        expect(getWeatherByCityResponse).to.have.nested.property("city.coord.lon");
        expect(getWeatherByCityResponse).to.have.nested.property("city.country");
        expect(getWeatherByCityResponse).to.have.nested.property("city.timezone");
        expect(getWeatherByCityResponse).to.have.nested.property("city.sunrise");
        expect(getWeatherByCityResponse).to.have.nested.property("city.sunset");
        expect(getWeatherByCityResponse.cod).to.eql("200");
    });

    it('Expect to recieve current weather information by coordinates', async () => {
        getWeatherByCoordinatesStub.withArgs(constants.CURRENT_TYPE, latStub, lonStub).returns(currentStubs.stubCurrentLaResponse);
        const getWeatherByCoordinateResponse = await utils.getWeatherByCoordinates(constants.CURRENT_TYPE, latStub, lonStub);
        expect(getWeatherByCoordinateResponse).to.be.a('Object');
        expect(getWeatherByCoordinateResponse).to.have.property("coord");
        expect(getWeatherByCoordinateResponse).to.have.property("weather");
        expect(getWeatherByCoordinateResponse.weather).to.be.a('Array');
        expect(getWeatherByCoordinateResponse).to.have.property("base");
        expect(getWeatherByCoordinateResponse).to.have.property("main");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("main.temp");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("main.feels_like");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("main.temp_min");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("main.temp_max");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("main.pressure");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("main.humidity");
        expect(getWeatherByCoordinateResponse).to.have.property("visibility");
        expect(getWeatherByCoordinateResponse).to.have.property("wind");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("wind.speed");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("wind.deg");
        expect(getWeatherByCoordinateResponse).to.have.property("clouds");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("clouds.all");
        expect(getWeatherByCoordinateResponse).to.have.property("dt");
        expect(getWeatherByCoordinateResponse).to.have.property("sys");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("sys.type");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("sys.id");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("sys.country");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("sys.sunrise");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("sys.sunset");
        expect(getWeatherByCoordinateResponse).to.have.property("timezone");
        expect(getWeatherByCoordinateResponse).to.have.property("id");
        expect(getWeatherByCoordinateResponse).to.have.property("name");
        expect(getWeatherByCoordinateResponse).to.have.property("cod");
        expect(getWeatherByCoordinateResponse.cod).to.eql(200);
        expect(getWeatherByCoordinateResponse.name).to.eql('Los Angeles');
    });

    it('Expect to recieve forecast weather information by coordinates', async () => {
        getWeatherByCoordinatesStub.withArgs(constants.FORECAST_TYPE, latStub, lonStub).returns(forecastStubs.la);
        const getWeatherByCoordinateResponse = await utils.getWeatherByCoordinates(constants.FORECAST_TYPE, latStub, lonStub);
        expect(getWeatherByCoordinateResponse).to.be.a('Object');
        expect(getWeatherByCoordinateResponse).to.have.property("cod");
        expect(getWeatherByCoordinateResponse).to.have.property("message");
        expect(getWeatherByCoordinateResponse).to.have.property("cnt");
        expect(getWeatherByCoordinateResponse).to.have.property("list");
        expect(getWeatherByCoordinateResponse.list).to.be.a('Array');
        expect(getWeatherByCoordinateResponse).to.have.property("city");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("city.id");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("city.name");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("city.coord");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("city.coord.lat");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("city.coord.lon");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("city.country");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("city.timezone");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("city.sunrise");
        expect(getWeatherByCoordinateResponse).to.have.nested.property("city.sunset");
        expect(getWeatherByCoordinateResponse.cod).to.eql("200");
    });
});

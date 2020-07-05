const sinon  = require('sinon'); 
const mocha = require ('mocha');
const chai = require('chai');
const forecast = require('./forecast');
const stub = require('./lib/stubs/forecast_stubs');
const expect = chai.expect;


describe('Forecast Unit Test', () => {

    beforeEach(() => {
        stubForecastResponse = stub.common;
        stubForecastLaResponse = stub.la;

        
       forecastStub = sinon.stub(forecast, 'handler');
    });

    afterEach(() => {
        forecastStub.restore();
    });
    
    it('Expect to recieve 5 day weather information', async () => {
       forecastStub.returns(stubForecastResponse);
       const forecastResponse = await forecast.handler();
       expect(forecastResponse).to.be.a('Object');
       expect(forecastResponse).to.have.property("cod");
       expect(forecastResponse).to.have.property("message");
       expect(forecastResponse).to.have.property("cnt");
       expect(forecastResponse).to.have.property("list");
       expect(forecastResponse.list).to.be.a('Array');
       expect(forecastResponse).to.have.property("city");
       expect(forecastResponse).to.have.nested.property("city.id");
       expect(forecastResponse).to.have.nested.property("city.name");
       expect(forecastResponse).to.have.nested.property("city.coord");
       expect(forecastResponse).to.have.nested.property("city.coord.lat");
       expect(forecastResponse).to.have.nested.property("city.coord.lon");
       expect(forecastResponse).to.have.nested.property("city.country");
       expect(forecastResponse).to.have.nested.property("city.timezone");
       expect(forecastResponse).to.have.nested.property("city.sunrise");
       expect(forecastResponse).to.have.nested.property("city.sunset");
       expect(forecastResponse.cod).to.eql("200");
    });

    it('Expect to recieve 5 day weather of city Los Angeles, US', async () => {
        const fakeRequest = {
            params: {
                city: 'Los Angeles, US'
            }
        }
        forecastStub.withArgs(fakeRequest).returns(stubForecastLaResponse);
        const forecastResponse = await forecast.handler(fakeRequest);
        expect(forecastResponse).to.be.a('Object');
        expect(forecastResponse).to.have.property("cod");
        expect(forecastResponse).to.have.property("message");
        expect(forecastResponse).to.have.property("cnt");
        expect(forecastResponse).to.have.property("list");
        expect(forecastResponse.list).to.be.a('Array');
        expect(forecastResponse).to.have.property("city");
        expect(forecastResponse).to.have.nested.property("city.id");
        expect(forecastResponse).to.have.nested.property("city.name");
        expect(forecastResponse).to.have.nested.property("city.coord");
        expect(forecastResponse).to.have.nested.property("city.coord.lat");
        expect(forecastResponse).to.have.nested.property("city.coord.lon");
        expect(forecastResponse).to.have.nested.property("city.country");
        expect(forecastResponse).to.have.nested.property("city.timezone");
        expect(forecastResponse).to.have.nested.property("city.sunrise");
        expect(forecastResponse).to.have.nested.property("city.sunset");
        expect(forecastResponse.cod).to.eql("200");
     }); 
});

const sinon  = require('sinon'); 
const mocha = require ('mocha');
const chai = require('chai');
const expect = chai.expect;
const current = require('./current');
const currentStubs = require('./lib/stubs/current_stubs');

describe('Current Unit Test', () => {
    beforeEach(() => {
        stubCurrentResponse = currentStubs.stubCurrentResponse;
        stubCurrentLaResponse = currentStubs.stubCurrentLaResponse;
        currentStub = sinon.stub(current, 'handler');
    });

    afterEach(() => {
        currentStub.restore();
    });

    it('Expect to recieve the day weather info from location', async () => {
       currentStub.returns(stubCurrentResponse);
       const currentResponse = await current.handler();
       expect(currentResponse).to.be.a('Object');
       expect(currentResponse).to.have.property("coord");
       expect(currentResponse).to.have.property("weather");
       expect(currentResponse.weather).to.be.a('Array');
       expect(currentResponse).to.have.property("base");
       expect(currentResponse).to.have.property("main");
       expect(currentResponse).to.have.nested.property("main.temp");
       expect(currentResponse).to.have.nested.property("main.feels_like");
       expect(currentResponse).to.have.nested.property("main.temp_min");
       expect(currentResponse).to.have.nested.property("main.temp_max");
       expect(currentResponse).to.have.nested.property("main.pressure");
       expect(currentResponse).to.have.nested.property("main.humidity");
       expect(currentResponse).to.have.property("visibility");
       expect(currentResponse).to.have.property("wind");
       expect(currentResponse).to.have.nested.property("wind.speed");
       expect(currentResponse).to.have.nested.property("wind.deg");
       expect(currentResponse).to.have.property("clouds");
       expect(currentResponse).to.have.nested.property("clouds.all");
       expect(currentResponse).to.have.property("dt");
       expect(currentResponse).to.have.property("sys");
       expect(currentResponse).to.have.nested.property("sys.type");
       expect(currentResponse).to.have.nested.property("sys.id");
       expect(currentResponse).to.have.nested.property("sys.country");
       expect(currentResponse).to.have.nested.property("sys.sunrise");
       expect(currentResponse).to.have.nested.property("sys.sunset");
       expect(currentResponse).to.have.property("timezone");
       expect(currentResponse).to.have.property("id");
       expect(currentResponse).to.have.property("name");
       expect(currentResponse).to.have.property("cod");
       expect(currentResponse.cod).to.eql(200);
    });

    it('Expect to recieve the day weather of city Los Angeles, US', async () => {
        const fakeRequest = {
            params: {
                city: 'Los Angeles, US'
            }
        }
        currentStub.withArgs(fakeRequest).returns(stubCurrentLaResponse);
        const currentResponse = await current.handler(fakeRequest);
        expect(currentResponse).to.be.a('Object');
        expect(currentResponse).to.have.property("coord");
        expect(currentResponse).to.have.property("weather");
        expect(currentResponse.weather).to.be.a('Array');
        expect(currentResponse).to.have.property("base");
        expect(currentResponse).to.have.property("main");
        expect(currentResponse).to.have.nested.property("main.temp");
        expect(currentResponse).to.have.nested.property("main.feels_like");
        expect(currentResponse).to.have.nested.property("main.temp_min");
        expect(currentResponse).to.have.nested.property("main.temp_max");
        expect(currentResponse).to.have.nested.property("main.pressure");
        expect(currentResponse).to.have.nested.property("main.humidity");
        expect(currentResponse).to.have.property("visibility");
        expect(currentResponse).to.have.property("wind");
        expect(currentResponse).to.have.nested.property("wind.speed");
        expect(currentResponse).to.have.nested.property("wind.deg");
        expect(currentResponse).to.have.property("clouds");
        expect(currentResponse).to.have.nested.property("clouds.all");
        expect(currentResponse).to.have.property("dt");
        expect(currentResponse).to.have.property("sys");
        expect(currentResponse).to.have.nested.property("sys.type");
        expect(currentResponse).to.have.nested.property("sys.id");
        expect(currentResponse).to.have.nested.property("sys.country");
        expect(currentResponse).to.have.nested.property("sys.sunrise");
        expect(currentResponse).to.have.nested.property("sys.sunset");
        expect(currentResponse).to.have.property("timezone");
        expect(currentResponse).to.have.property("id");
        expect(currentResponse).to.have.property("name");
        expect(currentResponse).to.have.property("cod");
        expect(currentResponse.cod).to.eql(200);
        expect(currentResponse.name).to.eql('Los Angeles');
     });
});

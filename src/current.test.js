const sinon  = require('sinon'); 
const mocha = require ('mocha');
const chai = require('chai');
const expect = chai.expect;
const current = require('./current');

describe('Current Unit Test', () => {

    beforeEach(() => {
        stubCurrentResponse = {
                "coord": {
                    "lon": -64.18,
                    "lat": -31.4
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04n"
                    }
                ],
                "base": "stations",
                "main": {
                    "temp": 282.14,
                    "feels_like": 274.2,
                    "temp_min": 281.48,
                    "temp_max": 282.59,
                    "pressure": 1015,
                    "humidity": 57
                },
                "visibility": 10000,
                "wind": {
                    "speed": 8.7,
                    "deg": 190
                },
                "clouds": {
                    "all": 90
                },
                "dt": 1593918175,
                "sys": {
                    "type": 1,
                    "id": 8226,
                    "country": "AR",
                    "sunrise": 1593947766,
                    "sunset": 1593984379
                },
                "timezone": -10800,
                "id": 3866169,
                "name": "Alta Córdoba",
                "cod": 200
            };
        stubCurrentLaResponse = {
            "coord": {
                "lon": -118.24,
                "lat": 34.05
            },
            "weather": [
                {
                    "id": 721,
                    "main": "Haze",
                    "description": "haze",
                    "icon": "50n"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 292.92,
                "feels_like": 293.84,
                "temp_min": 292.15,
                "temp_max": 294.26,
                "pressure": 1014,
                "humidity": 77
            },
            "visibility": 1609,
            "wind": {
                "speed": 1.32,
                "deg": 148
            },
            "clouds": {
                "all": 90
            },
            "dt": 1593927902,
            "sys": {
                "type": 1,
                "id": 3694,
                "country": "US",
                "sunrise": 1593866804,
                "sunset": 1593918473
            },
            "timezone": -25200,
            "id": 5368361,
            "name": "Los Angeles",
            "cod": 200
        }
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

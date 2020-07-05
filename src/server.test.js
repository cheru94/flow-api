const mocha = require ('mocha');
const request = require('supertest');

const server = 'http://localhost:3000';

const chai = require('chai');
const expect = chai.expect;


describe('Integration Test', () => {

    beforeEach(() => {
         fakeBaseResponse = {
            'message': 'Welcome to the Weather API Base Route'
        }

        fakeLocationResponse = {
            "status": "success",
            "country": "Argentina",
            "countryCode": "AR",
            "region": "X",
            "regionName": "Cordoba",
            "city": "Córdoba",
            "zip": "5000",
            "lat": -31.4015,
            "lon": -64.1803,
            "timezone": "America/Argentina/Cordoba",
            "isp": "Telecom Argentina S.A",
            "org": "Fibertel",
            "as": "AS10481 Telecom Argentina S.A.",
            "query": "181.164.130.181"
        }
    });
    describe('Base Endpoint Test', () => {
        it('GET /v1/', (done) => {
            request(server)
            .get('/v1')     
            .end((err, response) => {
                expect(response.body).to.be.a('Object');
                expect(response.body).to.eql(fakeBaseResponse);
                done();
            });
        });
    });
    describe('Location Endpoint Test', () => {
        it('GET /v1/location', (done) => {
            request(server)
            .get('/v1/location')
            .end((err, response) => {
                expect(response).to.have.deep.property("statusCode");
                expect(response.statusCode).to.eql(200);
                expect(response.body).to.be.a('Object');
                expect(response.body).to.have.property("status");
                expect(response.body).to.have.property("country");
                expect(response.body).to.have.property("countryCode");
                expect(response.body).to.have.property("region");
                expect(response.body).to.have.property("city");
                expect(response.body).to.have.property("zip");
                expect(response.body).to.have.property("lat");
                expect(response.body).to.have.property("lon");
                expect(response.body).to.have.property("timezone");
                expect(response.body).to.have.property("isp");
                expect(response.body).to.have.property("org");
                expect(response.body).to.have.property("as");
                expect(response.body).to.have.property("query");
                expect(response.body.status).to.eql(fakeLocationResponse.status);
                done();
            });
        });
    });
    describe('Current Endpoint Test', () => {
        it('GET /v1/current', (done) => {
            request(server)
            .get('/v1/current')
            .send()
            .end((err, response) => {
                expect(response).to.have.deep.property("statusCode");
                expect(response.statusCode).to.eql(200);
                expect(response.body).to.be.a('Object');
                expect(response.body).to.have.property("coord");
                expect(response.body).to.have.property("weather");
                expect(response.body.weather).to.be.a('Array');
                expect(response.body).to.have.property("base");
                expect(response.body).to.have.property("main");
                expect(response.body).to.have.nested.property("main.temp");
                expect(response.body).to.have.nested.property("main.feels_like");
                expect(response.body).to.have.nested.property("main.temp_min");
                expect(response.body).to.have.nested.property("main.temp_max");
                expect(response.body).to.have.nested.property("main.pressure");
                expect(response.body).to.have.nested.property("main.humidity");
                expect(response.body).to.have.property("visibility");
                expect(response.body).to.have.property("wind");
                expect(response.body).to.have.nested.property("wind.speed");
                expect(response.body).to.have.nested.property("wind.deg");
                expect(response.body).to.have.property("clouds");
                expect(response.body).to.have.nested.property("clouds.all");
                expect(response.body).to.have.property("dt");
                expect(response.body).to.have.property("sys");
                expect(response.body).to.have.nested.property("sys.type");
                expect(response.body).to.have.nested.property("sys.id");
                expect(response.body).to.have.nested.property("sys.country");
                expect(response.body).to.have.nested.property("sys.sunrise");
                expect(response.body).to.have.nested.property("sys.sunset");
                expect(response.body).to.have.property("timezone");
                expect(response.body).to.have.property("id");
                expect(response.body).to.have.property("name");
                expect(response.body).to.have.property("cod");
                expect(response.body.cod).to.eql(200);
                done();
            });
        });
    });

    describe('Current Endpoint Test with Params', () => {
        it('GET /v1/current?city=Los Angeles, US', (done) => {
            const param = 'city=Los Angeles, US';
            request(server)
            .get(`/v1/current?${param}`)     
            .end((err, response) => {
                expect(response).to.have.deep.property("statusCode");
                expect(response.statusCode).to.eql(200);
                expect(response.body).to.be.a('Object');
                expect(response.body).to.have.property("coord");
                expect(response.body).to.have.property("weather");
                expect(response.body.weather).to.be.a('Array');
                expect(response.body).to.have.property("base");
                expect(response.body).to.have.property("main");
                expect(response.body).to.have.nested.property("main.temp");
                expect(response.body).to.have.nested.property("main.feels_like");
                expect(response.body).to.have.nested.property("main.temp_min");
                expect(response.body).to.have.nested.property("main.temp_max");
                expect(response.body).to.have.nested.property("main.pressure");
                expect(response.body).to.have.nested.property("main.humidity");
                expect(response.body).to.have.property("visibility");
                expect(response.body).to.have.property("wind");
                expect(response.body).to.have.nested.property("wind.speed");
                expect(response.body).to.have.nested.property("wind.deg");
                expect(response.body).to.have.property("clouds");
                expect(response.body).to.have.nested.property("clouds.all");
                expect(response.body).to.have.property("dt");
                expect(response.body).to.have.property("sys");
                expect(response.body).to.have.nested.property("sys.type");
                expect(response.body).to.have.nested.property("sys.id");
                expect(response.body).to.have.nested.property("sys.country");
                expect(response.body).to.have.nested.property("sys.sunrise");
                expect(response.body).to.have.nested.property("sys.sunset");
                expect(response.body).to.have.property("timezone");
                expect(response.body).to.have.property("id");
                expect(response.body).to.have.property("name");
                expect(response.body).to.have.property("cod");
                expect(response.body.cod).to.eql(200);
                expect(response.body.name).to.eql('Los Angeles');
                done();
            });
        });
    });    

    describe('Forecast Endpoint Test', () => {
        it('GET /v1/forecast', (done) => {
            request(server)
            .get('/v1/forecast')     
            .end((err, response) => {
                expect(response).to.have.deep.property("statusCode");
                expect(response.statusCode).to.eql(200);
                expect(response.body).to.be.a('Object');
                expect(response.body).to.have.property("cod");
                expect(response.body).to.have.property("message");
                expect(response.body).to.have.property("cnt");
                expect(response.body).to.have.property("list");
                expect(response.body.list).to.be.a('Array');
                expect(response.body).to.have.property("city");
                expect(response.body).to.have.nested.property("city.id");
                expect(response.body).to.have.nested.property("city.name");
                expect(response.body).to.have.nested.property("city.coord");
                expect(response.body).to.have.nested.property("city.coord.lat");
                expect(response.body).to.have.nested.property("city.coord.lon");
                expect(response.body).to.have.nested.property("city.country");
                expect(response.body).to.have.nested.property("city.timezone");
                expect(response.body).to.have.nested.property("city.sunrise");
                expect(response.body).to.have.nested.property("city.sunset");
                expect(response.body.cod).to.eql("200");
                done();
            });
        });
    });

    describe('Forecast Endpoint Test with Params', () => {
        it('GET /v1/forecast?city=Los Angeles, US', (done) => {
            const param = 'city=Los Angeles, US';
            request(server)
            .get(`/v1/forecast?${param}`)     
            .end((err, response) => {
                expect(response).to.have.deep.property("statusCode");
                expect(response.statusCode).to.eql(200);
                expect(response.body).to.be.a('Object');
                expect(response.body).to.have.property("cod");
                expect(response.body).to.have.property("message");
                expect(response.body).to.have.property("cnt");
                expect(response.body).to.have.property("list");
                expect(response.body.list).to.be.a('Array');
                expect(response.body).to.have.property("city");
                expect(response.body).to.have.nested.property("city.id");
                expect(response.body).to.have.nested.property("city.name");
                expect(response.body.city.name).to.eql('Los Angeles');
                expect(response.body).to.have.nested.property("city.coord");
                expect(response.body).to.have.nested.property("city.coord.lat");
                expect(response.body).to.have.nested.property("city.coord.lon");
                expect(response.body).to.have.nested.property("city.country");
                expect(response.body.city.country).to.eql('US');
                expect(response.body).to.have.nested.property("city.population");
                expect(response.body).to.have.nested.property("city.timezone");
                expect(response.body).to.have.nested.property("city.sunrise");
                expect(response.body).to.have.nested.property("city.sunset");
                expect(response.body.cod).to.eql("200");
                done();
            });
        });
    });
});

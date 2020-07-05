const sinon  = require('sinon'); 
const mocha = require ('mocha');
const chai = require('chai');
const expect = chai.expect;
const location = require('./location');


describe('Location Unit Test', () => {

    beforeEach(() => {
    const stubLocationResponse = {
        status: 'success',
        country: 'Argentina',
        countryCode: 'AR',
        region: 'X',
        regionName: 'Cordoba',
        city: 'Córdoba',
        zip: '5000',
        lat: -31.4015,
        lon: -64.1803,
        timezone: 'America/Argentina/Cordoba',
        isp: 'Telecom Argentina S.A',
        org: 'Fibertel',
        as: 'AS10481 Telecom Argentina S.A.',
        query: '181.164.130.181'
        };
       locationStub = sinon.stub(location, 'handler');
       locationStub.onCall(0).returns(stubLocationResponse);
    });

    afterEach(() => {
        locationStub.restore();
    });
    
    it('Expect to recieve location information', async () => {
       const locationResponse = await location.handler();
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
});

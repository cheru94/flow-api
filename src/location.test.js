const sinon  = require('sinon'); 
const mocha = require ('mocha');
const chai = require('chai');
const expect = chai.expect;
const location = require('./location');
const stubs = require('./lib/stubs/location_stubs');


describe('Location Unit Test', () => {

    beforeEach(() => {
       locationStub = sinon.stub(location, 'handler');
    });

    afterEach(() => {
        locationStub.restore();
    });
    
    it('Expect to recieve location information', async () => {
        locationStub.returns(stubs.locationStub);
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
